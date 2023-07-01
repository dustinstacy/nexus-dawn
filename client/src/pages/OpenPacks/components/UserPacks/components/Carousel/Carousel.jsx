import React, { useEffect, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

import './Carousel.scss'

// Carousel component that displays a set of items with slide navigation
const Carousel = ({
    uniqueItems,
    allItems,
    setCurrentItem,
    emptyMessage,
    children,
}) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [slideDirection, setSlideDirection] = useState('')

    // Extract the current, previous, and next items based on the current item index
    const current = uniqueItems[currentItemIndex]
    const previous =
        uniqueItems[
            (currentItemIndex + uniqueItems.length - 1) % uniqueItems.length
        ]
    const next = uniqueItems[(currentItemIndex + 1) % uniqueItems.length]

    // Array of carousel positions with corresponding item data
    const carouselPositions = [
        { position: 'previous', itemData: previous },
        { position: 'current', itemData: current },
        { position: 'next', itemData: next },
    ]

    // Update the current item when it changes
    useEffect(() => {
        setCurrentItem(current)
    }, [current, setCurrentItem])

    // Handle the slide action based on the specified direction
    const handleSlide = (direction) => {
        setSlideDirection(direction)
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                direction === 'right'
                    ? index === 0
                        ? uniqueItems.length - 1
                        : index - 1
                    : index === uniqueItems.length - 1
                    ? 0
                    : index + 1
            )
            setSlideDirection('')
        }, 500)
    }

    return (
        <div className='carousel fill between'>
            {uniqueItems.length ? (
                <>
                    <BiLeftArrow
                        className='arrow-previous'
                        onClick={() => handleSlide('left')}
                    />

                    {carouselPositions.map(({ position, itemData }) => (
                        <div
                            key={position}
                            className={`carousel-item start-column ${position} ${slideDirection}`}
                        >
                            {React.cloneElement(children, {
                                itemData,
                                allItems,
                            })}
                        </div>
                    ))}
                    <BiRightArrow
                        className='arrow-next'
                        onClick={() => handleSlide('right')}
                    />
                </>
            ) : (
                <h2 className='center'>{emptyMessage}</h2>
            )}
        </div>
    )
}

export default Carousel
