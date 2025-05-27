import api from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { IItem, NextStage, User } from '@interfaces'
import { assignRandomCardValues, getRandomCards } from '@randomizers'
import stores from '@stores'
import utils from '@utils'

import localApi from '../../api'
import { onboardingStages } from '../../constants'
import './introduction.scss'

const Introduction = ({ nextStage }: NextStage) => {
	const { addCardToCollection, addCoin, addItemToInventory } = api
	const { user, fetchUserData } = stores.useUserStore((state) => state)
	const allCards = stores.useCardsStore((state) => state.allCards)
	const allItems = stores.useItemsStore((state) => state.allItems)
	const stageData = onboardingStages[0]

	const handleBegin = async () => {
		await localApi.completeUserStartingData()
		await addCoin(user as User, 200)
		fetchUserData('coin')
		nextStage('/market')
	}

	const handleSkip = async () => {
		await localApi.completeUserStartingData()
		await addCoin(user as User, 200)

		let starterCards = []
		const commonCards = getRandomCards(12, { Common: 100 }, allCards)
		const uncommonCards = getRandomCards(2, { Uncommon: 100 }, allCards)

		starterCards = [...commonCards, ...uncommonCards]
		starterCards.forEach(async (card) => {
			assignRandomCardValues(card)
			const cardData = utils.createCardData(card)
			try {
				await addCardToCollection(cardData)
			} catch (error) {
				console.log(error)
			}
		})

		const rarePack = allItems.find((item) => item.name === 'Rare Pack')

		await addItemToInventory(user as User, rarePack as IItem)
		await localApi.skipOnboarding()
		fetchUserData('coin')
		fetchUserData('inventory')
		fetchUserData('onboardingStage')
	}

	return (
		<ModalOverlay>
			<div
				className="introduction stage around-column"
				data-cy="stage"
			>
				<div className="header-wrapper">
					<h1
						className="header"
						data-cy="header"
					>
						{stageData.header}
						<img
							className="logo abs-center"
							src={smlogo.src}
							alt="small logo"
							data-cy="logo"
						/>
					</h1>
				</div>
				<div className="body box start-column">
					<p data-cy="body">{stageData.body}</p>
					<div className="buttons center-column">
						<Button
							label={stageData.label as string}
							onClick={handleBegin}
							dataCy="handle-begin-button"
						/>
						<a
							onClick={handleSkip}
							data-cy="handle-skip-link"
						>
							Skip
						</a>
					</div>
				</div>
			</div>
		</ModalOverlay>
	)
}

export default Introduction
