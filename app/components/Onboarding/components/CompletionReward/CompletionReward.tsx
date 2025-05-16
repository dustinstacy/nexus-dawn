import { useState } from 'react'

import api from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { IItem, NextStage, User } from '@interfaces'
import stores from '@stores'

import { onboardingStages } from '../../constants'
import './completionReward.scss'

const CompletionReward = ({ nextStage }: NextStage) => {
	const { useItemsStore, useUserStore } = stores
	const { user, fetchUserData } = useUserStore((state) => state)
	const allItems = useItemsStore((state) => state.allItems)
	const [step, setStep] = useState(1)
	const rarePack = allItems.find((item) => item.name === 'Rare Pack')

	const incrementStep = async () => {
		await api.addItemToInventory(user as User, rarePack as IItem)

		fetchUserData('inventory')
		setStep((step) => step + 1)
	}

	return (
		<ModalOverlay>
			<div
				className="completion stage around-column"
				data-cy="completion"
			>
				<div className="header-wrapper">
					<h1
						className="header"
						data-cy="header"
					>
						{step === 1 ? onboardingStages[5].header[0] : onboardingStages[5].header[1]}
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
						<p data-cy="body-text">{onboardingStages[5].body}</p>
						<Button
							label={onboardingStages[5].label[0]}
							onClick={incrementStep}
							dataCy="button-step-1"
						/>
					</div>
				)}
				{step === 2 && (
					<div className="body center-column">
						<p data-cy="body">{rarePack?.name || 'No Rare Pack Available'}</p>
						<img
							className="rare-card-image"
							src={rarePack?.image}
							alt="rare card"
							data-cy="rare-card-image"
						/>
						<Button
							label={onboardingStages[3].label[0]}
							onClick={() => nextStage()}
							dataCy="button-step-2"
						/>
					</div>
				)}
			</div>
		</ModalOverlay>
	)
}

export default CompletionReward
