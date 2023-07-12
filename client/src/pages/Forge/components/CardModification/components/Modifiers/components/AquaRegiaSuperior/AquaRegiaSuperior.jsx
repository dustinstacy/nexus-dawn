import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { VscDebugRestart } from 'react-icons/vsc'

import { Button, Card } from '@components'

const AquaRegiaSuperior = ({
    selectedCard,
    selectedCardValues,
    setSelectedCardValues,
    setModificationInProgress,
}) => {
    let updatedCardValues = [...selectedCardValues]

    const rotateValues = () => {
        updatedCardValues.unshift(updatedCardValues.pop())
        setSelectedCardValues(updatedCardValues)
    }

    const completeMod = async () => {
        await updateCardValues(selectedCard, updatedCardValues)
        await getUserCards()
        setModificationComplete(true)
    }

    const reset = () => {
        setSelectedCardValues(selectedCard.values)
    }

    return (
        <div className='regia center fill'>
            <div className='start-column'>
                <div className='mod-bar center'>
                    <Button
                        label='Rotate Values'
                        onClick={() => rotateValues()}
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

export default AquaRegiaSuperior
