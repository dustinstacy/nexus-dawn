import React, { useEffect, useState } from 'react'

import { Button, Card } from '@components'

import './AquaVitae.scss'

const AquaVitae = ({ selectedCard }) => {
    const [selectedCardValues, setSelectedCardValues] = useState([])
    const [selectedValues, setSelectedValues] = useState([])
    const [chosenValue, setChosenValue] = useState(null)

    const selectValue = (i) => {
        let updatedValues = selectedCardValues
        let updatedSelectedValues = selectedValues
        if (chosenValue) {
            updatedValues[i] = chosenValue
            setSelectedCardValues(updatedValues)
        }
        if (selectedValues?.length === 0) {
            updatedSelectedValues.push(selectedCardValues[i])
            setSelectedValues(() => updatedSelectedValues)
        } else {
            updatedSelectedValues.push(selectedCardValues[i])
            setSelectedValues(() => updatedSelectedValues)
        }

        updatedValues[i] = ''
        console.log(updatedValues)
        setSelectedCardValues(() => updatedValues)
    }

    useEffect(() => {
        // calculateFluxCost()
        if (selectedCard) {
            setSelectedCardValues((prevValues) => [...selectedCard?.values])
        }
    }, [selectedCard])

    return (
        <div>
            <div className='center-column'>
                <div className='panel card-select center'>
                    <div className='selected-card center fill'>
                        <Card card={selectedCard} isShowing />
                    </div>
                    {selectedCardValues?.map((value, i) => (
                        <div
                            key={value + i * 10}
                            className={`value-${i} box center ${
                                selectedValues?.length > 1 &&
                                value !== '' &&
                                'disabled'
                            }`}
                            onClick={() => selectValue(i)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
                <Button
                    label={modificationInProgress ? 'Cancel' : 'Modify Card'}
                    onClick={() => handleClick()}
                    disabled={
                        selectedModification === null ||
                        selectedModification === '-'
                    }
                />
            </div>
            <div className='panel card-select value-bank center'>
                {selectedValues?.map((value, i) => (
                    <div
                        key={value + i * 10}
                        className='value box center'
                        onClick={() => setChosenValue(value)}
                    >
                        {value}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AquaVitae
