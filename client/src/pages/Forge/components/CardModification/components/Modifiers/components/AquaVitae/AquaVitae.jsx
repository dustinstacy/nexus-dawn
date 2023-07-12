import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { VscDebugRestart } from 'react-icons/vsc'

import { Card } from '@components'

const AquaVitae = ({
    selectedCard,
    selectedCardValues,
    setSelectedCardValues,
    setModificationInProgress,
}) => {
    const [modValues, setModValues] = useState([])
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

    const modValueClick = (e, value) => {
        if (chosenValue === null) {
            e.target.classList.add('selected')
            setChosenValue(value)
        } else {
            e.target.classList.remove('selected')
            setChosenValue(null)
        }
    }

    const removeModValue = (value) => {
        const modValueIndex = updatedModValues.indexOf(value)
        if (modValueIndex !== -1) {
            updatedModValues.splice(modValueIndex, 1)
            setModValues(updatedModValues)
        }
    }

    const reset = () => {
        setModValues([])
        setChosenValue(null)
        setSelectedCardValues(selectedCard.values)
    }

    return (
        <div className='vitae center fill'>
            <div className='start-column'>
                <div className='mod-bar center'>
                    {modValues?.map((value, i) => (
                        <div
                            key={value + i * 10}
                            className='value box center'
                            onClick={(e) => modValueClick(e, value)}
                        >
                            {value}
                        </div>
                    ))}
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
            </div>
        </div>
    )
}

export default AquaVitae
