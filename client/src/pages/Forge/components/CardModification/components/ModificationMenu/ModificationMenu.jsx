import React, { useEffect } from 'react'

import { Button } from '@components'

import { CardSelector, ModificationSelector } from './components'
import './ModificationMenu.scss'

const ModificationMenu = ({
    selectedCard,
    setSelectedCard,
    selectedModification,
    setSelectedModification,
    setModificationInProgress,
    setCardModification,
}) => {
    useEffect(() => {
        if (selectedCard == null) {
            setSelectedModification('-')
        }
    }, [selectedCard])

    return (
        <div className='center-column'>
            <div className='mod-panel center'>
                <CardSelector
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                />
            </div>
            <ModificationSelector
                selectedCard={selectedCard}
                selectedModification={selectedModification}
                setSelectedModification={setSelectedModification}
                setModificationInProgress={setModificationInProgress}
            />
            <Button
                label='Modify Card'
                onClick={() => setModificationInProgress(true)}
                disabled={
                    selectedModification === null ||
                    selectedModification === '-' ||
                    !selectedCard
                }
            />
            <Button label='Exit' onClick={() => setCardModification(false)} />
        </div>
    )
}

export default ModificationMenu
