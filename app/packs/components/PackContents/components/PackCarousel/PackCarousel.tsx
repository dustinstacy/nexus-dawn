import React, { ReactElement, useEffect, useState } from "react"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"

import "./PackCarousel.scss"
import { ICard } from "@interfaces"

interface PackCarousel {
    uniqueItems: ICard[][]
    currentBatch?: ICard[]
    setCurrentItem: React.Dispatch<React.SetStateAction<ICard[]>>
    emptyMessage?: string
    children: ReactElement<{ packContents: ICard[] }>
}

// Carousel component that displays a set of items with slide navigation
const PackCarousel = ({ uniqueItems, setCurrentItem, emptyMessage, children }: PackCarousel) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [slideDirection, setSlideDirection] = useState("")

    // Extract the current, previous, and next items based on the current item index
    const current = uniqueItems[currentItemIndex]
    const previous = uniqueItems[(currentItemIndex + uniqueItems.length - 1) % uniqueItems.length]
    const next = uniqueItems[(currentItemIndex + 1) % uniqueItems.length]

    // Array of carousel positions with corresponding item data
    const carouselPositions = [
        { position: "previous", itemData: previous },
        { position: "current", itemData: current },
        { position: "next", itemData: next },
    ]

    // Update the current item when it changes
    useEffect(() => {
        setCurrentItem(current)
    }, [current, setCurrentItem])

    // Handle the slide action based on the specified direction
    const handleSlide = (direction: string) => {
        setSlideDirection(direction)
        setTimeout(() => {
            setCurrentItemIndex((index) =>
                direction === "right"
                    ? index === 0
                        ? uniqueItems.length - 1
                        : index - 1
                    : index === uniqueItems.length - 1
                    ? 0
                    : index + 1
            )
            setSlideDirection("")
        }, 500)
    }

    return (
        <div className='pack-carousel fill between'>
            {uniqueItems.length ? (
                <>
                    <BiLeftArrow className='arrow-previous' onClick={() => handleSlide("left")} />

                    {carouselPositions.map(({ position }) => (
                        <div key={position} className={`pack-carousel-item start-column ${position} ${slideDirection}`}>
                            {React.cloneElement(children)} 
                        </div>
                    ))}
                    <BiRightArrow className='arrow-next' onClick={() => handleSlide("right")} />
                </>
            ) : (
                <h2 className='center'>{emptyMessage}</h2>
            )}
        </div>
    )
}

export default PackCarousel
