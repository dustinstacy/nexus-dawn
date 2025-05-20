import { useEffect, useState } from 'react'

import { addCardToCollection } from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useToggle } from '@hooks'
import { NextStage } from '@interfaces'
import { getRandomCards, assignRandomCardValues } from '@randomizers'
import { useCardsStore, useUserStore } from '@stores'
import { createCardData } from '@utils'

import { onboardingStages } from '../../constants'
import { packOdds, openPack, cardValues } from '../../images'

import './howToOpenPacks.scss'
import Image from 'next/image'

const HowToOpenPacks = ({ nextStage }: NextStage) => {
	const user = useUserStore((state) => state.user)
	const userCards = useUserStore((state) => state.userCards)
	const allCards = useCardsStore((state) => state.allCards)
	const stage = user?.onboardingStage
	const [step, setStep] = useState(1)
	const [modalOpen, toggleModalOpen, setModalOpen] = useToggle(true)

	const handleClick = async () => {
		let starterCards = []
		const commonCards = getRandomCards(12, { Common: 100 }, allCards)
		const uncommonCards = getRandomCards(2, { Uncommon: 100 }, allCards)
		starterCards = [...commonCards, ...uncommonCards]
		starterCards.forEach(async (card) => {
			assignRandomCardValues(card)
			const cardData = createCardData(card)
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
							<h1 className="header">
								{onboardingStages[2].header}
								<Image
									className="logo abs-center"
									src={smlogo.src}
									alt="small logo"
								/>
							</h1>
						</div>
						{step === 1 && (
							<div className="body box start-column">
								<p>{onboardingStages[2].body[0]}</p>
								<Button
									label={onboardingStages[2].label[0]}
									onClick={incrementStep}
								/>
							</div>
						)}
						{step === 2 && (
							<div className="body box center">
								<p>{onboardingStages[2].body[1]}</p>
								<Image
									src={packOdds.src}
									alt="pack odds"
								/>
								<Button
									label={onboardingStages[2].label[0]}
									onClick={incrementStep}
								/>
							</div>
						)}
						{step === 3 && (
							<div className="body box center">
								<p>{onboardingStages[2].body[2]}</p>
								<Image
									src={openPack.src}
									alt="pack odds"
								/>
								<Button
									label={onboardingStages[2].label[1]}
									onClick={() => toggleModalOpen()}
								/>
							</div>
						)}
						{step === 4 && (
							<div className="body box center">
								<p>{onboardingStages[2].body[3]}</p>
								<Image
									src={cardValues.src}
									alt="cardValues"
								/>
								<Button
									label={onboardingStages[2].label[0]}
									onClick={handleClick}
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
