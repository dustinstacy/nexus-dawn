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
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)
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
							<h1 className="header">
								{onboardingStages[1].header}
								<img
									className="logo abs-center"
									src={smlogo.src}
									alt="small logo"
								/>
							</h1>
						</div>
						{step === 1 && (
							<div className="body box start-column">
								<p>{onboardingStages[1].body[0]}</p>
								<Button
									label={onboardingStages[1].label[0]}
									onClick={incrementStep}
								/>
							</div>
						)}
						{step === 2 && (
							<div className="body box step-2 center">
								<p>{onboardingStages[1].body[1]}</p>
								<img
									className="market-menu-image"
									src={marketMenu.src}
									alt="market menu"
								/>
								<Button
									label={onboardingStages[1].label[0]}
									onClick={incrementStep}
								/>
							</div>
						)}
						{step === 3 && (
							<div className="body box center-column">
								<p>{onboardingStages[1].body[2]}</p>
								<img
									className="purchase-bar-image"
									src={purchaseButton.src}
									alt="market menu"
								/>
								<Button
									label={onboardingStages[1].label[1]}
									onClick={() => toggleModalOpen()}
								/>
							</div>
						)}
						{step === 4 && (
							<div className="body box center-column">
								<p>{onboardingStages[1].body[3]}</p>
								<Button
									label={onboardingStages[1].label[0]}
									onClick={() => nextStage('/packs')}
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
