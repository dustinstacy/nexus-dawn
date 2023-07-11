import React from 'react'

import { Button, CardList } from '@components'
import { useGlobalContext } from '@context'

import './CardListContainer'

const CardListContainer = ({ setCardSelectOpen, setSelectedCard }) => {
    const { userCards } = useGlobalContext()

    const sortedCards = userCards.sort(
        (a, b) =>
            b.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            ) -
            a.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            )
    )

    const selectCard = (e, card) => {
        e.preventDefault()
        setSelectedCard(card)
        setCardSelectOpen(false)
    }

    return (
        <div className='start-column'>
            <div className='collection-display box start-column'>
                <CardList cardArray={sortedCards} handleClick={selectCard} />
            </div>
            <Button label='Cancel' onClick={() => setCardSelectOpen(false)} />
        </div>
    )
}

export default CardListContainer
