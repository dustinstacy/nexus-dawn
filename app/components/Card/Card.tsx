import React, { useRef } from "react"

import { cardback } from "@assets"
import { classSet } from "@utils"
import { ICard } from "@interfaces"

import "./card.scss"

interface CardProps {
    card: ICard
    isDraggable?: boolean
    isDragged?: boolean
    isShowing?: boolean
    isSelected?: boolean
    handleClick?: (e: React.MouseEvent<HTMLDivElement>, card: ICard) => void
    setCardDragged?: (card: ICard | null) => void
}

const Card = ({ card, isDraggable, isDragged, isShowing, isSelected, handleClick, setCardDragged }: CardProps) => {
    const { captured, color, _id, image, values } = card || {}

    const defaultColor = `rgb(3, 48, 59)`

    const cardClasses = classSet(
        "card",
        captured ? "captured" : "",
        isDragged ? "is-dragged" : "",
        isShowing ? "is-showing" : "",
        isSelected ? "is-selected" : ""
    )

    const dragImageRef = useRef<HTMLDivElement>(null)

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
        const dragImage = dragImageRef.current as HTMLDivElement
        setCardDragged?.(card)

        // Make sure the event target is an HTML element before calling getBoundingClientRect
        const targetElement = e.currentTarget as HTMLDivElement

        // Position the drag image at the center of the mouse cursor
        const offsetX = e.clientX - targetElement.getBoundingClientRect().left
        const offsetY = e.clientY - targetElement.getBoundingClientRect().top
        e.dataTransfer.setDragImage(dragImage, offsetX, offsetY)
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setCardDragged?.(null)
    }

    return (
        <div
            className={cardClasses}
            id={_id}
            draggable={isDraggable}
            onClick={(e) => handleClick?.(e, card)}
            onDragStart={(e) => handleDragStart(e, card)}
            onDragEnd={(e) => handleDragEnd(e)}
        >
            <div
                className='card__side card__front fill'
                style={{ background: color || defaultColor }}
                ref={dragImageRef}
            >
                <img className='card__image fill' src={image} alt={_id} />
                <div className='card__values'>
                    <span className='up center'>{values[0]}</span>
                    <span className='right center'>{values[1]}</span>
                    <span className='down center'>{values[2]}</span>
                    <span className='left center'>{values[3]}</span>
                </div>
            </div>
            <div className='card__side card__back fill'>
                <img className='card__image' src={cardback.src} alt={_id} />
            </div>
        </div>
    )
}

export default Card
