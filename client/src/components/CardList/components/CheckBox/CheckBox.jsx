import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'

import { useGlobalContext } from '@context'

import { addSelection, removeSelection } from './api'
import './CheckBox.scss'

const CheckBox = ({ card }) => {
    const { getCurrentUser, userCards, userDeck } = useGlobalContext()

    // Selects and adds a single card to the user's deck
    const addToDeck = async (card) => {
        let errorDisplayed = false
        if (userDeck.length < 35 && userDeck.length < userCards.length + 1) {
            await addSelection(card)
            await getCurrentUser()
        } else {
            if (!errorDisplayed) {
                errorDisplayed = true
                alert('Your deck is currently full')
            }
        }
    }

    // Unselects and removes a single card from the user's deck
    const removeFromDeck = async (card) => {
        await removeSelection(card)
        await getCurrentUser()
    }

    const handleClick = async () => {
        !card.selected ? await addToDeck(card) : await removeFromDeck(card)
    }

    return (
        <div className='checkbox' onClick={handleClick}>
            {card.selected ? (
                <ImCheckboxChecked className='check' />
            ) : (
                <ImCheckboxUnchecked className='uncheck' />
            )}
        </div>
    )
}

export default CheckBox
