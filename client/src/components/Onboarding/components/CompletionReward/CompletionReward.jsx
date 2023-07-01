import React, { useState } from 'react'

import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import { onboardingStages } from '../../constants'

import './CompletionReward.scss'

const CompletionReward = ({ nextStage }) => {
    const { allItems } = useGlobalContext()
    const [step, setStep] = useState(1)
    const rareCard = allItems.find((item) => item.name === 'Rare Card')

    const incrementStep = () => {
        setStep((step) => step + 1)
    }

    return (
        <ModalOverlay>
            <div className='completion stage around-column'>
                <div className='header-wrapper'>
                    <h1 className='header'>
                        {step === 1
                            ? onboardingStages[5].header[0]
                            : onboardingStages[5].header[1]}
                        <img
                            className='logo abs-center'
                            src={smlogo}
                            alt='small logo'
                        />
                    </h1>
                </div>
                {step === 1 && (
                    <div className='body box start-column'>
                        <p>{onboardingStages[5].body}</p>
                        <Button
                            label={onboardingStages[5].label[0]}
                            onClick={incrementStep}
                        />
                    </div>
                )}
                {step === 2 && (
                    <div className='body center-column'>
                        <p>{rareCard.name}</p>
                        <img
                            className='rare-card-image'
                            src={rareCard.image}
                            alt='rare card'
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
