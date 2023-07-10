import React, { useState } from 'react'

import { Button, Card } from '@components'
import { useGlobalContext } from '@context'
import { maxValues } from '@constants'

import { updateCardValues } from '../../../../api'
import './AquaFortis.scss'

const AquaFortis = ({ selectedCard, setModificationComplete }) => {
    const { getUserCards } = useGlobalContext()

    const [modValue, setModValue] = useState(0)
    const [selectedCardValues, setSelectedCardValues] = useState([
        ...selectedCard.values,
    ])
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

    const completeMod = async () => {
        await updateCardValues(selectedCard, updatedCardValues)
        await getUserCards()
        setModificationComplete(true)
    }

    const reset = () => {
        setModValue(0)
        setSelectedCardValues(selectedCard.values)
        setCardModified(false)
    }

    return (
        <div className='Fortis center fill'>
            <div className='start-column'>
                <div className='panel card-select center'>
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

                <Button label='Reset' onClick={() => reset()} />
                <Button
                    label='Complete Modification'
                    onClick={() => completeMod()}
                    disabled={selectedCard.values.every(
                        (value, index) => value === updatedCardValues[index]
                    )}
                />
            </div>
            <div className='panel card-select value-bank center'>
                <div className='value box center'>{modValue}</div>
            </div>
        </div>
    )
}

export default AquaFortis
