import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

import { Card } from "@components"
import { classSet } from "@utils"

import "./hand.scss"
import { ICard, CPUDetails, UserDetails } from "@interfaces"

interface HandProps {
    player: UserDetails | CPUDetails
    battleState: any
    cardDragged: ICard | null
    cardSelected: ICard | null
    setCardSelected: Dispatch<SetStateAction<ICard | null>>
    setCardDragged: Dispatch<SetStateAction<ICard | null>>
    handsDealt: boolean
}

const Hand = ({
    player,
    battleState,
    cardDragged,
    cardSelected,
    setCardSelected,
    setCardDragged,
    handsDealt,
}: HandProps) => {
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

    const handleClick = (e: MouseEvent, card: ICard) => {
        e.preventDefault()
        if (battleState.isP1Turn && name === "p1" && hand.includes(card)) {
            if (card === cardSelected) {
                setCardSelected(null)
            } else {
                setCardSelected(card)
            }
        }
    }

    const handClasses = classSet(
        name === "p1" ? "p1 hand" : "p2 hand",
        shouldCollapse ? "collapse" : "",
        !handsDealt ? "dealing" : ""
    )

    return (
        <div className={handClasses}>
            {hand.length > 0 &&
                hand?.map((card: ICard, index: number) => (
                    <Card
                        key={card._id! + index}
                        card={card}
                        isShowing={name === "p1"}
                        isDraggable={name === "p1" && battleState.isP1Turn}
                        isSelected={cardSelected?._id === card?._id}
                        isDragged={card === cardDragged}
                        handleClick={(e: any) => handleClick(e, card)}
                        setCardSelected={setCardSelected}
                        setCardDragged={setCardDragged}
                    />
                ))}
        </div>
    )
}

export default Hand
