import React, { useEffect, useState } from 'react'

import {
    CardSelector,
    ModifiedCard,
    Modifiers,
    ModificationSelector,
} from './components'
import './Forge.scss'

const Forge = () => {
    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedModification, setSelectedModification] = useState('-')
    const [modificationInProgress, setModificationInProgress] = useState(false)
    const [modificationComplete, setModificationComplete] = useState(false)

    useEffect(() => {
        if (modificationComplete) {
            setModificationInProgress(false)
        }
    }, [modificationComplete])

    return (
        <div className='forge page center'>
            {!modificationInProgress && !modificationComplete && (
                <div className='start-column'>
                    <CardSelector
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                    />
                    <ModificationSelector
                        selectedCard={selectedCard}
                        selectedModification={selectedModification}
                        setSelectedModification={setSelectedModification}
                        setModificationInProgress={setModificationInProgress}
                    />
                </div>
            )}
            {modificationInProgress && !modificationComplete && (
                <Modifiers
                    selectedCard={selectedCard}
                    selectedModification={selectedModification}
                    setModificationComplete={setModificationComplete}
                    setModificationInProgress={setModificationInProgress}
                />
            )}
            {modificationComplete && (
                <ModifiedCard
                    selectedCard={selectedCard}
                    setModificationComplete={setModificationComplete}
                    setSelectedCard={setSelectedCard}
                />
            )}
        </div>
    )
}

export default Forge
