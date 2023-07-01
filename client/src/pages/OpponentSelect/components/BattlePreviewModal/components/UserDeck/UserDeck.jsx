import React from 'react'

import { addCardToDeck, removeCardFromDeck } from '@api'
import { headerStyle } from '@assets'
import { Button } from '@components'
import { useGlobalContext } from '@context'
import { calculateDeckPower, calculateOptimizedDeck, classSet } from '@utils'

import './UserDeck.scss'

// Renders the user's deck information.
const UserDeck = ({ selectedOpponent }) => {
    const { getCurrentUser, userCards, userDeck } = useGlobalContext()

    // Calculate the strongest combination of the user's cards based on the opponent's card count requirement
    const userOptimizedDeck = calculateOptimizedDeck(
        userCards,
        selectedOpponent.cardCount
    )

    // Calculate the sum of all card values in the user's deck
    const userDeckPower = calculateDeckPower(userDeck)
    // Calculate the sum of all card values in the user's highest potential deck
    const userOptimizedDeckPower = calculateDeckPower(userOptimizedDeck)

    const optimizeDeck = async () => {
        userDeck.forEach((card) => {
            if (
                !userOptimizedDeck.some(
                    (optimizedCard) => optimizedCard._id === card._id
                )
            ) {
                removeCardFromDeck(card)
            }
        })
        userOptimizedDeck.forEach((optimizedCard) => {
            if (!userDeck.some((card) => card._id === optimizedCard._id)) {
                addCardToDeck(optimizedCard)
            }
        })
        await getCurrentUser()
    }

    const countColor = classSet(
        userDeck?.length === selectedOpponent.cardCount ? 'valid' : 'invalid'
    )

    return (
        <div className='user-deck start-column'>
            <div className='header-wrapper center'>
                <img
                    className='header-style'
                    src={headerStyle}
                    alt='header style'
                />
                Equipped Deck
            </div>
            <div className='deck-wrapper fill around'>
                <div className='deck-info start-column'>
                    <div className='user-deck-power'>
                        <h4>Power</h4>
                        <span>{userDeckPower || 0}</span>
                    </div>
                    <div className='user-deck-count'>
                        <h4>Card Count</h4>
                        <span className={countColor}>{userDeck.length}</span>
                        &nbsp; / &nbsp;
                        <span>{selectedOpponent.cardCount}</span>
                    </div>
                </div>
                <div className='buttons start-column'>
                    <Button
                        label='Optimize Deck'
                        onClick={optimizeDeck}
                        disabled={userDeckPower === userOptimizedDeckPower}
                    />
                    <Button label='Edit Deck' type='link' path='/collection' />
                </div>
            </div>
        </div>
    )
}

export default UserDeck
