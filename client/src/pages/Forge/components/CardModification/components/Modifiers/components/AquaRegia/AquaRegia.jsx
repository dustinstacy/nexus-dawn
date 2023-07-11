import React, { useState } from 'react'

import { Button, Card } from '@components'
import { useGlobalContext } from '@context'

import { updateCardValues } from '../../../../api'
import './AquaRegia.scss'

const AquaRegia = ({ selectedCard, setModificationComplete }) => {
    const { getUserCards } = useGlobalContext()

    const [selectedCardValues, setSelectedCardValues] = useState([
        ...selectedCard.values,
    ])
    const [rotated, setRotated] = useState(false)

    let updatedCardValues = [...selectedCardValues]

    const rotateValues = () => {
        updatedCardValues.unshift(updatedCardValues.pop())
        setSelectedCardValues(updatedCardValues)
        setRotated(true)
    }

    const completeMod = async () => {
        await updateCardValues(selectedCard, updatedCardValues)
        await getUserCards()
        setModificationComplete(true)
    }

    const reset = () => {
        setSelectedCardValues(selectedCard.values)
        setRotated(false)
    }

    return (
        <div className='Regia center fill'>
            <div className='start-column'>
                <Button
                    label='Rotate Values'
                    onClick={() => rotateValues()}
                    disabled={rotated}
                />
                <div className='panel card-select center'>
                    <div className='selected-card center fill'>
                        <Card card={selectedCard} isShowing />
                    </div>
                    {updatedCardValues?.map((value, i) => (
                        <div
                            key={value + i * 10}
                            className={`value-${i} box center `}
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
        </div>
    )
}

export default AquaRegia
