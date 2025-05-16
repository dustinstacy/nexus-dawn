'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { User } from '@interfaces'
import stores from '@stores'

import { incrementOnboardingStage } from './api'
import {
	CompletionReward,
	HowToBuildADeck,
	HowToGetCards,
	HowToOpenPacks,
	HowToPlay,
	Introduction
} from './components'
import './onboarding.scss'

const Onboarding = () => {
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)
	const fetchUserData = useUserStore((state) => state.fetchUserData)
	const router = useRouter()
	const stage = user?.onboardingStage

	// Conditionally navigate and update state progress based on the current stage and progress
	useEffect(() => {
		if (stage === 0) {
			router.push('/')
		}
		if (stage === 1) {
			router.push('/market')
		}
		if (stage === 2) {
			router.push('/packs')
		}
		if (stage === 3) {
			router.push('/collection')
		}
		if (stage === 4 || stage === 5) {
			router.push('/how-to-play')
		}
	}, [, stage])

	// Advances the user to next onboarding stage
	const nextStage = async (path?: string) => {
		try {
			await incrementOnboardingStage(user as User)
			fetchUserData('onboardingStage')
			path && router.push(`${path}`)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{stage === 0 && <Introduction nextStage={nextStage} />}
			{stage === 1 && <HowToGetCards nextStage={nextStage} />}
			{stage === 2 && <HowToOpenPacks nextStage={nextStage} />}
			{stage === 3 && <HowToBuildADeck nextStage={nextStage} />}
			{stage === 4 && <HowToPlay nextStage={nextStage} />}
			{stage === 5 && <CompletionReward nextStage={nextStage} />}
		</>
	)
}

export default Onboarding
