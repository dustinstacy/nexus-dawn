import React, { useState } from 'react'

import { Button, Card } from '@components'
import { useGlobalContext } from '@context'

import { updateCardValues } from '../../api'
import './AquaVitae.scss'

const AquaVitae = ({
    selectedCard,
    setModificationInProgress,
    setModificationComplete,
}) => {
    const { getUserCards } = useGlobalContext()

    const [modValues, setModValues] = useState([])
    const [selectedCardValues, setSelectedCardValues] = useState(
        selectedCard.values
    )
    const [chosenValue, setChosenValue] = useState(null)

    let updatedCardValues = [...selectedCardValues]
    let updatedModValues = [...modValues]

    const cardValueClick = (value, i) => {
        if (value !== '') {
            chooseValue(value)
            removeValue(i)
        } else if (chosenValue !== null) {
            placeValue(chosenValue, i)
            setChosenValue(null)
        }
    }

    const chooseValue = (value) => {
        if (modValues?.length < 2) {
            updatedModValues.push(value)
            setModValues(updatedModValues)
        }
    }

    const removeValue = (i) => {
        updatedCardValues[i] = ''
        setSelectedCardValues(updatedCardValues)
    }

    const placeValue = (value, i) => {
        updatedCardValues[i] = value
        setSelectedCardValues(updatedCardValues)
        removeModValue(value)
    }

    const modValueClick = (value) => {
        setChosenValue(value)
    }

    const removeModValue = (value) => {
        const modValueIndex = updatedModValues.indexOf(value)
        if (modValueIndex !== -1) {
            updatedModValues.splice(modValueIndex, 1)
            setModValues(updatedModValues)
        }
    }

    const completeMod = async () => {
        await updateCardValues(selectedCard, updatedCardValues)
        await getUserCards()
        setModificationInProgress(false)
        setModificationComplete(true)
    }

    const reset = () => {
        setModValues([])
        setChosenValue(null)
        setSelectedCardValues(selectedCard.values)
    }

    return (
        <div className='vitae around'>
            <div className='center-column'>
                <div className='panel card-select center'>
                    <div className='selected-card center fill'>
                        <Card card={selectedCard} isShowing />
                    </div>
                    {updatedCardValues?.map((value, i) => (
                        <div
                            key={value + i * 10}
                            className={`value-${i} box center ${
                                modValues?.length > 1 &&
                                value !== '' &&
                                'disabled'
                            }`}
                            onClick={() => cardValueClick(value, i)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
                <Button
                    label='Cancel'
                    onClick={() => setModificationInProgress(false)}
                />
                <Button label='Reset' onClick={() => reset()} />
                <Button
                    label='Complete Modification'
                    onClick={() => completeMod()}
                    disabled={
                        selectedCard.values.every(
                            (value, index) => value === updatedCardValues[index]
                        ) || modValues.length > 0
                    }
                />
            </div>
            <div className='panel card-select value-bank center'>
                {modValues?.map((value, i) => (
                    <div
                        key={value + i * 10}
                        className='value box center'
                        onClick={() => modValueClick(value)}
                    >
                        {value}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AquaVitae
