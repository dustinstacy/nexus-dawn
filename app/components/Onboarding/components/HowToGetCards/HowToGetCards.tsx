import { useEffect, useState } from 'react'

import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useToggle } from '@hooks'
import { NextStage, User } from '@interfaces'
import stores from '@stores'

import { onboardingStages } from '../../constants'
import { marketMenu, purchaseButton } from '../../images'

import './howToGetCards.scss'

const HowToGetCards = ({ nextStage }: NextStage) => {
	const user = stores.useUserStore((state) => state.user)
	const { inventory } = (user as User) || {}
	const stage = user?.onboardingStage
	const [step, setStep] = useState(1)
	const [modalOpen, toggleModalOpen, setModalOpen] = useToggle(true)

	const incrementStep = () => {
		setStep((step) => step + 1)
	}

	useEffect(() => {
		if (inventory.length > 0 && stage === 1) {
			setTimeout(() => {
				setModalOpen(true)
				setStep(4)
			}, 1000)
		}
	}, [, user?.inventory])

	return (
		<>
			{modalOpen && (
				<ModalOverlay>
					<div className="get-cards stage around-column">
						<div className="header-wrapper">
							<h1
								data-cy="header"
								className="header"
							>
								{onboardingStages[1].header}
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
								<p data-cy="body">{onboardingStages[1].body[0]}</p>
								<Button
									label={onboardingStages[1].label[0]}
									onClick={incrementStep}
									dataCy="increment-step-button-1"
								/>
							</div>
						)}
						{step === 2 && (
							<div className="body box step-2 center">
								<p data-cy="body">{onboardingStages[1].body[1]}</p>
								<img
									className="market-menu-image"
									src={marketMenu.src}
									alt="market menu"
									data-cy="market-menu-image"
								/>
								<Button
									label={onboardingStages[1].label[0]}
									onClick={incrementStep}
									dataCy="increment-step-button-2"
								/>
							</div>
						)}
						{step === 3 && (
							<div className="body box center-column">
								<p data-cy="body">{onboardingStages[1].body[2]}</p>
								<img
									className="purchase-bar-image"
									src={purchaseButton.src}
									alt="market menu"
									data-cy="purchase-bar-image"
								/>
								<Button
									label={onboardingStages[1].label[1]}
									onClick={() => toggleModalOpen()}
									dataCy="close-modal-button"
								/>
							</div>
						)}
						{step === 4 && (
							<div className="body box center-column">
								<p data-cy="body">{onboardingStages[1].body[3]}</p>
								<Button
									label={onboardingStages[1].label[0]}
									onClick={() => nextStage('/packs')}
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

export default HowToGetCards
