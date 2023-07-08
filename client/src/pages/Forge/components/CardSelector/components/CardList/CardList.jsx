import React from 'react'

import { Button, Card } from '@components'
import { useGlobalContext } from '@context'

import './CardList'

const CardList = ({ setCardSelectOpen, setSelectedCard }) => {
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
        setSelectedCard(() => card)
        setCardSelectOpen(false)
    }

    return (
        <div className='start-column'>
            <div className='collection-display box start-column'>
                <div className='card-list'>
                    {sortedCards?.map((card) => (
                        <div key={card._id} className='card-container'>
                            <Card
                                card={card}
                                handleClick={(e) => selectCard(e, card)}
                                isShowing
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Button label='Cancel' onClick={() => setCardSelectOpen(false)} />
        </div>
    )
}

export default CardList
