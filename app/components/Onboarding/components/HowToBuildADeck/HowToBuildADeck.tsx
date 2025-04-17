import { useEffect, useState } from 'react'

import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useToggle } from '@hooks'
import { NextStage } from '@interfaces'
import { useUserStore } from '@stores'

import { onboardingStages } from '../../constants'
import { checkbox, optimizeDeck } from '../../images'

import './howToBuildADeck.scss'

const HowToBuildADeck = ({ nextStage }: NextStage) => {
	const { user, userDeck } = useUserStore((state) => state)
	const stage = user?.onboardingStage
	const [step, setStep] = useState(1)
	const [modalOpen, toggleModalOpen, setModalOpen] = useToggle(true)

	const incrementStep = () => {
		setStep((step) => step + 1)
	}

	useEffect(() => {
		if (userDeck.length >= 5 && stage === 3) {
			setTimeout(() => {
				setModalOpen(true)
				setStep(4)
			}, 1000)
		}
	}, [userDeck, stage, setModalOpen])

	return (
		<>
			{modalOpen && (
				<ModalOverlay>
					<div className="build-deck stage around-column">
						<div className="header-wrapper">
							<h1 className="header">
								{onboardingStages[3].header}
								<img
									className="logo abs-center"
									src={smlogo.src}
									alt="small logo"
								/>
							</h1>
						</div>
						{step === 1 && (
							<div className="body box start-column">
								<p>{onboardingStages[3].body[0]}</p>
								<Button
									label={onboardingStages[3].label[0]}
									onClick={incrementStep}
								/>
							</div>
						)}
						{step === 2 && (
							<div className="body box step-2 center-column">
								<p>{onboardingStages[3].body[1]}</p>
								<img
									className="optimize-deck-image"
									src={optimizeDeck.src}
									alt="market menu"
								/>
								<Button
									label={onboardingStages[3].label[0]}
									onClick={incrementStep}
								/>
							</div>
						)}
						{step === 3 && (
							<div className="body box step-3 center">
								<p>{onboardingStages[3].body[2]}</p>
								<img
									className="check-box-image"
									src={checkbox.src}
									alt="market menu"
								/>
								<Button
									label={onboardingStages[3].label[1]}
									onClick={() => toggleModalOpen()}
								/>
							</div>
						)}
						{step === 4 && (
							<div className="body box center-column">
								<p>{onboardingStages[3].body[3]}</p>
								<Button
									label={onboardingStages[3].label[0]}
									onClick={() => nextStage('/how-to-play')}
								/>
							</div>
						)}
					</div>
				</ModalOverlay>
			)}
		</>
	)
}

export default HowToBuildADeck
