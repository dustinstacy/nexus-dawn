import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from '@context'

import { incrementOnboardingStage } from './api'
import {
    Introduction,
    HowToGetCards,
    HowToOpenPacks,
    HowToBuildADeck,
    HowToPlay,
    CompletionReward,
} from './components'
import './Onboarding.scss'

const Onboarding = () => {
    const navigate = useNavigate()
    const { user, getCurrentUser } = useGlobalContext()
    const stage = user?.onboardingStage

    // Conditionally navigate and update state progress based on the current stage and progress
    useEffect(() => {
        if (stage === 0) {
            navigate('/')
        }
        if (stage === 1) {
            navigate('/market')
        }
        if (stage === 2) {
            navigate('/packs')
        }
        if (stage === 3) {
            navigate('/collection')
        }
        if (stage === 4 || stage === 5) {
            navigate('/rules')
        }
    }, [, stage])

    // Advances the user to next onboarding stage
    const nextStage = async (path) => {
        try {
            await incrementOnboardingStage(user)
            await getCurrentUser()
            path && navigate(`${path}`)
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
