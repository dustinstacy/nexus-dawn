import React, { useEffect, useState } from 'react'

import { Card } from '@components'
import { classSet } from '@utils'

import './Hand.scss'

const Hand = ({
    player,
    battleState,
    cardDragged,
    cardSelected,
    setCardSelected,
    setCardDragged,
    handsDealt,
}) => {
    const { hand, name } = player

    const [shouldCollapse, setShouldCollapse] = useState(false)

    useEffect(() => {
        if (cardDragged) {
            setCardSelected(null)
            setTimeout(() => {
                setShouldCollapse(true)
            }, 50)
        } else {
            setShouldCollapse(false)
        }
    }, [cardDragged])

    const handleClick = (e, card) => {
        e.preventDefault()
        if (battleState.isP1Turn && name === 'p1' && hand.includes(card)) {
            if (card === cardSelected) {
                setCardSelected(null)
            } else {
                setCardSelected(card)
            }
        }
    }

    const handClasses = classSet(
        name === 'p1' ? 'p1 hand' : 'p2 hand',
        shouldCollapse && 'collapse',
        !handsDealt && 'dealing'
    )

    return (
        <div className={handClasses}>
            {hand?.map((card, index) => (
                <Card
                    key={card?._id + index}
                    card={card}
                    isShowing={name === 'p1'}
                    isDraggable={name === 'p1' && battleState.isP1Turn}
                    isSelected={cardSelected?._id === card?._id}
                    isDragged={card === cardDragged}
                    handleClick={(e) => handleClick(e, card)}
                    setCardSelected={setCardSelected}
                    setCardDragged={setCardDragged}
                />
            ))}
        </div>
    )
}

export default Hand
