import React from 'react'

import { Card } from '@components'
import { useGlobalContext } from '@context'

import './CardList'

const CardList = ({ setCardSelectOpen, setSelectedCard }) => {
    const { userCards } = useGlobalContext()

    const selectCard = (e, card) => {
        e.preventDefault()
        setSelectedCard(card)
        setCardSelectOpen(false)
    }

    return (
        <div className='collection-display box start-column'>
            <div className='card-list'>
                {userCards?.map((card) => (
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
    )
}

export default CardList
