import { useEffect, useState } from 'react'

import api from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useToggle } from '@hooks'
import { NextStage } from '@interfaces'
import { assignRandomCardValues, getRandomCards } from '@randomizers'
import stores from '@stores'
import utils from '@utils'

import { onboardingStages } from '../../constants'
import { cardValues, openPack, packOdds } from '../../images'

import './howToOpenPacks.scss'

const HowToOpenPacks = ({ nextStage }: NextStage) => {
	const { addCardToCollection } = api
	const { user, userCards } = stores.useUserStore((state) => state)
	const allCards = stores.useCardsStore((state) => state.allCards)
	const stage = user?.onboardingStage
	const [step, setStep] = useState(1)
	const [modalOpen, toggleModalOpen, setModalOpen] = useToggle(true)
	const texts = onboardingStages[2]

	const handleClick = async () => {
		const commonCards = getRandomCards(12, { Common: 100 }, allCards)
		const uncommonCards = getRandomCards(2, { Uncommon: 100 }, allCards)
		const starterCards = [...commonCards, ...uncommonCards]

		starterCards.forEach(async (card) => {
			assignRandomCardValues(card)
			const cardData = utils.createCardData(card)

			try {
				await addCardToCollection(cardData)
			} catch (error) {
				console.log(error)
			}
		})
		await nextStage('/collection')
	}

	const incrementStep = () => {
		setStep((step) => step + 1)
	}

	useEffect(() => {
		if (userCards?.length > 0 && stage === 2) {
			setTimeout(() => {
				setModalOpen(true)
				setStep(4)
			}, 1000)
		}
	}, [, userCards])

	return (
		<>
			{modalOpen && (
				<ModalOverlay>
					<div className="open-pack stage around-column">
						<div className="header-wrapper">
							<h1
								data-cy="header"
								className="header"
							>
								{texts.header}
								<img
									className="logo abs-center"
									src={smlogo.src}
									alt="small logo"
									data-cy="logo"
								/>
							</h1>
						</div>
						{step === 1 && (
							<div className="body box start-column">
								<p data-cy="body">{texts.body[0]}</p>
								<Button
									label={texts.label[0]}
									onClick={incrementStep}
									dataCy="increment-step-button-1"
								/>
							</div>
						)}
						{step === 2 && (
							<div className="body box center">
								<p data-cy="body">{texts.body[1]}</p>
								<img
									src={packOdds.src}
									alt="pack odds"
									data-cy="pack-odds-image"
								/>
								<Button
									label={texts.label[0]}
									onClick={incrementStep}
									dataCy="increment-step-button-2"
								/>
							</div>
						)}
						{step === 3 && (
							<div className="body box center">
								<p data-cy="body">{texts.body[2]}</p>
								<img
									src={openPack.src}
									alt="pack odds"
									data-cy="open-pack-image"
								/>
								<Button
									label={texts.label[1]}
									onClick={() => toggleModalOpen()}
									dataCy="close-modal-button"
								/>
							</div>
						)}
						{step === 4 && (
							<div className="body box center">
								<p data-cy="body">{texts.body[3]}</p>
								<img
									src={cardValues.src}
									alt="cardValues"
								/>
								<Button
									label={texts.label[0]}
									onClick={handleClick}
									dataCy="step-4-button"
								/>
							</div>
						)}
					</div>
				</ModalOverlay>
			)}
		</>
	)
}

export default HowToOpenPacks
