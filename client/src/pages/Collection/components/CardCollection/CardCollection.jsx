import React, { useMemo } from 'react'

import { Card } from '@components'
import { useGlobalContext } from '@context'

import { CheckBox } from './components'
import * as Sorters from '../../utils'
import './CardCollection.scss'

// Renders all of the user's cards and provides options to filter them out
const CardCollection = ({ deckFilter, rarityFilter, valueFilter }) => {
    const { user, userCards, userDeck } = useGlobalContext()

    // Applies filters to the user's cards based on the selected filter options
    const filteredCards = useMemo(() => {
        userCards.forEach((card) => {
            card.color = user.color
        })
        let filtered = Sorters.sortByCardNumber(userCards)
        if (deckFilter === 'In Deck') {
            filtered = Sorters.sortByCardsInDeck(userCards, userDeck)
        } else if (deckFilter === 'Not In Deck') {
            filtered = Sorters.sortByCardsNotInDeck(userCards, userDeck)
        }
        if (rarityFilter && rarityFilter !== '-') {
            filtered = Sorters.sortByRarity(filtered, rarityFilter)
        }
        if (valueFilter == 'Total') {
            filtered = Sorters.sortByTotalCardValue(filtered)
        } else if (valueFilter && valueFilter !== '-') {
            const valuesArray = ['Up', 'Right', 'Down', 'Left', 'Total']
            const valueIndex = valuesArray.indexOf(valueFilter)
            filtered = Sorters.sortBySingleValue(filtered, valueIndex)
        }

        return filtered
    }, [deckFilter, rarityFilter, valueFilter, userCards, userDeck])

    return (
        <div className='card-collection start-column'>
            <div className='card-list'>
                {filteredCards?.map((card) => (
                    <div key={card._id} className='card-container'>
                        <Card card={card} isShowing />
                        <CheckBox card={card} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardCollection
