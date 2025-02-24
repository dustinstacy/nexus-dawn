import React, { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { VscDebugRestart } from "react-icons/vsc"

import { Card } from "@components"
import { maxValues } from "@constants"
import { ICard } from "@interfaces"

interface AquaFortis {
    setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
    selectedCard: ICard | null
    selectedCardValues: Array<number>
    setSelectedCardValues: React.Dispatch<React.SetStateAction<Array<number>>>
}

const AquaFortis = ({
    selectedCard,
    selectedCardValues,
    setSelectedCardValues,
    setModificationInProgress,
}: AquaFortis) => {
    const [modValue, setModValue] = useState(0)
    const [cardModified, setCardModified] = useState(false)

    const selectedCardMaxSingleValue = maxValues[selectedCard?.rarity as keyof typeof maxValues]

    const updatedCardValues = [...selectedCardValues]
    let updatedModValue = modValue

    const cardValueClick = (value: number, i: number) => {
        if (modValue === 0) {
            deductValue(value, i)
        } else {
            addValue(value, i)
        }
    }

    const deductValue = (value: number, i: number) => {
        updatedCardValues[i] = Number(value) - 1
        updatedModValue += 1
        setSelectedCardValues(updatedCardValues)
        setModValue(updatedModValue)
    }

    const addValue = (value: number, i: number) => {
        updatedCardValues[i] = Number(value) + 1
        updatedModValue -= 1
        setSelectedCardValues(updatedCardValues)
        setModValue(updatedModValue)
        if (!selectedCard?.values.every((value, index) => value === updatedCardValues[index])) {
            setCardModified(true)
        }
    }

    const reset = () => {
        setModValue(0)
        setSelectedCardValues(selectedCard!.values)
        setCardModified(false)
    }

    return (
        <div className='fortis center fill'>
            <div className='start-column'>
                <div className='mod-bar center'>
                    <div className={`value box center ${cardModified && "disabled"}`}>{modValue}</div>
                </div>
                <div className='mod-panel center'>
                    <AiOutlineCloseCircle className='cancel' onClick={() => setModificationInProgress(false)} />
                    <VscDebugRestart className='reset' onClick={() => reset()} />
                    <div className='selected-card center fill'>
                        <Card card={selectedCard!} isShowing />
                    </div>
                    {updatedCardValues?.map((value, i) => (
                        <div
                            key={value + i * 10}
                            className={`value-${i} box center ${
                                modValue !== 0 && value === selectedCardMaxSingleValue && "disabled"
                            } ${cardModified && "disabled"}`}
                            onClick={() => cardValueClick(value, i)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AquaFortis
