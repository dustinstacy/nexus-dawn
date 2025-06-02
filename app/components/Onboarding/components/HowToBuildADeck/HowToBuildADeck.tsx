import { useEffect, useState } from 'react'

import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useToggle } from '@hooks'
import { NextStage } from '@interfaces'
import stores from '@stores'

import { onboardingStages } from '../../constants'
import { checkbox, optimizeDeck } from '../../images'

import './howToBuildADeck.scss'

const HowToBuildADeck = ({ nextStage }: NextStage) => {
	const { user, userDeck } = stores.useUserStore((state) => state)
	const stage = user?.onboardingStage
	const [step, setStep] = useState(1)
	const [modalOpen, toggleModalOpen, setModalOpen] = useToggle(true)
	const stageTexts = onboardingStages[3]

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
	}, [, userDeck])

	return (
		<>
			{modalOpen && (
				<ModalOverlay>
					<div className="build-deck stage around-column">
						<div className="header-wrapper">
							<h1
								className="header"
								data-cy="header"
							>
								{stageTexts.header}
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
								<p data-cy="body">{stageTexts.body[0]}</p>
								<Button
									label={stageTexts.label[0]}
									onClick={incrementStep}
									dataCy="increment-step-button-1"
								/>
							</div>
						)}
						{step === 2 && (
							<div className="body box step-2 center-column">
								<p data-cy="body">{stageTexts.body[1]}</p>
								<img
									className="optimize-deck-image"
									src={optimizeDeck.src}
									alt="market menu"
									data-cy="optimize-deck-image"
								/>
								<Button
									label={stageTexts.label[0]}
									onClick={incrementStep}
									dataCy="increment-step-button-2"
								/>
							</div>
						)}
						{step === 3 && (
							<div className="body box step-3 center">
								<p data-cy="body">{stageTexts.body[2]}</p>
								<img
									className="check-box-image"
									src={checkbox.src}
									alt="market menu"
									data-cy="check-box-image"
								/>
								<Button
									label={stageTexts.label[1]}
									onClick={() => toggleModalOpen()}
									dataCy="close-modal-button"
								/>
							</div>
						)}
						{step === 4 && (
							<div className="body box center-column">
								<p data-cy="body">{stageTexts.body[3]}</p>
								<Button
									label={stageTexts.label[0]}
									onClick={() => nextStage('/how-to-play')}
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

export default HowToBuildADeck
