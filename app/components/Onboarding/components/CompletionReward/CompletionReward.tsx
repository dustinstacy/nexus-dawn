import { useState } from 'react'

import { addItemToInventory } from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { NextStage, IItem, User } from '@interfaces'
import { useItemsStore, useUserStore } from '@stores'

import { onboardingStages } from '../../constants'
import './completionReward.scss'
import Image from 'next/image'
const CompletionReward = ({ nextStage }: NextStage) => {
	const user = useUserStore((state) => state.user)
	const fetchUserData = useUserStore((state) => state.fetchUserData)
	const allItems = useItemsStore((state) => state.allItems)
	const [step, setStep] = useState(1)
	const rarePack = allItems.find((item) => item.name === 'Rare Pack')

	const incrementStep = async () => {
		await addItemToInventory(user as User, rarePack as IItem)
		fetchUserData('inventory')
		setStep((step) => step + 1)
	}

	return (
		<ModalOverlay>
			<div className="completion stage around-column">
				<div className="header-wrapper">
					<h1 className="header">
						{step === 1 ? onboardingStages[5].header[0] : onboardingStages[5].header[1]}
						<Image
							className="logo abs-center"
							src={smlogo.src}
							alt="small logo"
						/>
					</h1>
				</div>
				{step === 1 && (
					<div className="body box start-column">
						<p>{onboardingStages[5].body}</p>
						<Button
							label={onboardingStages[5].label[0]}
							onClick={incrementStep}
						/>
					</div>
				)}
				{step === 2 && (
					<div className="body center-column">
						<p>{rarePack!.name}</p>
						<Image
							className="rare-card-image"
							src={rarePack!.image}
							alt="rare card"
						/>
						<Button
							label={onboardingStages[3].label[0]}
							onClick={() => nextStage()}
						/>
					</div>
				)}
			</div>
		</ModalOverlay>
	)
}

export default CompletionReward
