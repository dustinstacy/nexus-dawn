import React from 'react'

import { addCardToCollection, addCoin, addItemToInventory } from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { createCardData } from '@utils'
import { assignRandomCardValues, getRandomCards } from '@utils/randomizers'

import { completeUserStartingData, skipOnboarding } from '../../api'
import { onboardingStages } from '../../constants'
import './Introduction.scss'

const Introduction = ({ nextStage }) => {
    const { allCards, allItems, getCurrentUser, user } = useGlobalContext()

    const handleBegin = async () => {
        await completeUserStartingData()
        await addCoin(user, 200)
        nextStage('/market')
    }

    const handleSkip = async () => {
        await completeUserStartingData()
        await addCoin(user, 200)
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
        const rareCard = allItems.find((item) => item.name === 'Rare Card')
        await addItemToInventory(user, rareCard)
        await skipOnboarding(user)
        await getCurrentUser()
    }

    return (
        <ModalOverlay>
            <div className='introduction stage around-column'>
                <div className='header-wrapper'>
                    <h1 className='header'>
                        {onboardingStages[0].header}
                        <img
                            className='logo abs-center'
                            src={smlogo}
                            alt='small logo'
                        />
                    </h1>
                </div>
                <div className='body box start-column'>
                    <p>{onboardingStages[0].body}</p>
                    <div className='buttons center-column'>
                        <Button
                            label={onboardingStages[0].label}
                            onClick={handleBegin}
                        />
                        <a onClick={handleSkip}>Skip</a>
                    </div>
                </div>
            </div>
        </ModalOverlay>
    )
}

export default Introduction
