import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { VscDebugRestart } from 'react-icons/vsc'

import { Card } from '@components'
import { maxValues } from '@constants'

const AquaFortis = ({
    selectedCard,
    selectedCardValues,
    setSelectedCardValues,
    setModificationInProgress,
}) => {
    const [modValue, setModValue] = useState(0)
    const [cardModified, setCardModified] = useState(false)

    const selectedCardMaxSingleValue = maxValues[selectedCard.rarity]

    let updatedCardValues = [...selectedCardValues]
    let updatedModValue = modValue

    const cardValueClick = (value, i) => {
        if (modValue === 0) {
            deductValue(value, i)
        } else {
            addValue(value, i)
        }
    }

    const deductValue = (value, i) => {
        updatedCardValues[i] = Number(value) - 1
        updatedModValue += 1
        setSelectedCardValues(updatedCardValues)
        setModValue(updatedModValue)
    }

    const addValue = (value, i) => {
        updatedCardValues[i] = Number(value) + 1
        updatedModValue -= 1
        setSelectedCardValues(updatedCardValues)
        setModValue(updatedModValue)
        if (
            !selectedCard.values.every(
                (value, index) => value === updatedCardValues[index]
            )
        ) {
            setCardModified(true)
        }
    }

    const reset = () => {
        setModValue(0)
        setSelectedCardValues(selectedCard.values)
        setCardModified(false)
    }

    return (
        <div className='fortis center fill'>
            <div className='start-column'>
                <div className='mod-bar center'>
                    <div
                        className={`value box center ${
                            cardModified && 'disabled'
                        }`}
                    >
                        {modValue}
                    </div>
                </div>
                <div className='mod-panel center'>
                    <AiOutlineCloseCircle
                        className='cancel'
                        onClick={() => setModificationInProgress(false)}
                    />
                    <VscDebugRestart
                        className='reset'
                        onClick={() => reset()}
                    />
                    <div className='selected-card center fill'>
                        <Card card={selectedCard} isShowing />
                    </div>
                    {updatedCardValues?.map((value, i) => (
                        <div
                            key={value + i * 10}
                            className={`value-${i} box center ${
                                modValue !== 0 &&
                                value === selectedCardMaxSingleValue &&
                                'disabled'
                            } ${cardModified && 'disabled'}`}
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
