import { useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

import { addCardToDeck, removeCardFromDeck } from '@api'
import { Filter, Button } from '@components'
import { useGlobalContext } from '@context'
import { calculateDeckPower, calculateOptimizedDeck } from '@utils'
import { ICard } from 'src/global.interfaces'

import { removeAllFromDeck } from './api'
import './DeckBar.scss'

// Renders the user's deck statistics and provides options to automatically manage the deck
const DeckBar = () => {
    const { userCards, userDeck, getCurrentUser } = useGlobalContext()
    const [deckCount, setDeckCount] = useState(15)
    const [fillDeckLoading, setFillDeckLoading] = useState(false)
    const [clearDeckLoading, setClearDeckLoading] = useState(false)

    // Calculate the strongest combination of the user's cards based on the opponent's card count requirement
    const userOptimizedDeck = calculateOptimizedDeck(userCards, deckCount)

    // Calculate sum of all card values in user's deck
    const userDeckPower = calculateDeckPower(userDeck)
    // Calculate the sum of all card values in the user's highest potential deck
    const userOptimizedDeckPower = calculateDeckPower(userOptimizedDeck)

    const optimizeDeck = async () => {
        userDeck.forEach((card: ICard) => {
            if (
                !userOptimizedDeck.some(
                    (optimizedCard: ICard) => optimizedCard._id === card._id
                )
            ) {
                removeCardFromDeck(card)
            }
        })
        userOptimizedDeck.forEach((optimizedCard: ICard) => {
            if (
                !userDeck.some((card: ICard) => card._id === optimizedCard._id)
            ) {
                addCardToDeck(optimizedCard)
            }
        })
        await getCurrentUser()
    }

    // Sorts all cards not in the user's deck and creates an array from the
    // strongest cards equal in length to the remaining space in the deck.
    // Then handles the API requests to add the cards to the deck and updates the user data upon completion
    const autoBuild = async () => {
        setFillDeckLoading(true)
        await optimizeDeck()
        setFillDeckLoading(false)
        getCurrentUser()
    }

    // Removes all cards from the user's deck using an API request
    // and updates the user data upon completion
    const emptyDeck = async () => {
        setClearDeckLoading(true)
        await removeAllFromDeck(userDeck)
        setClearDeckLoading(false)
        getCurrentUser()
    }

    // Determine the label for the fill deck button based on the fillDeckLoading state
    const fillDeckLabel = fillDeckLoading ? (
        <ThreeCircles
            color='#ffffff'
            wrapperClass='purchase-loader'
            visible={fillDeckLoading}
            height={'24px'}
        />
    ) : (
        'Optimize Deck'
    )

    // Determine the label for the clear deck button based on the clearDeckLoading state
    const clearDeckLabel = clearDeckLoading ? (
        <ThreeCircles
            color='#ffffff'
            wrapperClass='purchase-loader'
            visible={clearDeckLoading}
            height={'24px'}
        />
    ) : (
        'Clear Deck'
    )

    const optimizedDeckCountOptions = ['15', userCards?.length > 25 ? '25' : '']

    return (
        <div className='deck center-column'>
            <div className='deck-stats center'>
                <div className='count center-column'>
                    <p>Cards in Deck</p>
                    <p>
                        <span>{userDeck.length}</span>
                    </p>
                </div>
                <div className='strength center-column'>
                    <p>Power</p>
                    {userDeckPower}
                </div>
            </div>

            <div className='section center'>
                <div className='optimize-deck center'>
                    <Filter
                        id='cardCount'
                        label='Card Count'
                        value={deckCount}
                        setValue={() => setDeckCount}
                        options={optimizedDeckCountOptions}
                    />
                    <Button
                        onClick={autoBuild}
                        label={fillDeckLabel as string}
                        disabled={
                            userDeckPower === userOptimizedDeckPower ||
                            fillDeckLoading ||
                            clearDeckLoading
                        }
                    />
                </div>
                <Button
                    onClick={emptyDeck}
                    label={clearDeckLabel as string}
                    disabled={clearDeckLoading || fillDeckLoading}
                />
            </div>
        </div>
    )
}
export default DeckBar
