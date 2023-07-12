import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { VscDebugRestart } from 'react-icons/vsc'

import { Button, Card } from '@components'

const AquaRegia = ({
    selectedCard,
    selectedCardValues,
    setSelectedCardValues,
    setModificationInProgress,
}) => {
    const [rotated, setRotated] = useState(false)

    let updatedCardValues = [...selectedCardValues]

    const rotateValues = () => {
        updatedCardValues.unshift(updatedCardValues.pop())
        setSelectedCardValues(updatedCardValues)
        setRotated(true)
    }

    const reset = () => {
        setSelectedCardValues(selectedCard.values)
        setRotated(false)
    }

    return (
        <div className='regia center fill'>
            <div className='start-column'>
                <div className='mod-bar center'>
                    <Button
                        label='Rotate Values'
                        onClick={() => rotateValues()}
                        disabled={rotated}
                    />
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
                            className={`value-${i} box center `}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AquaRegia