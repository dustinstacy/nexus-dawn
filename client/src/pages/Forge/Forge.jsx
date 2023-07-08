import React, { useState } from 'react'

import {
    AquaVitae,
    CardSelector,
    ModifiedCard,
    ModificationSelector,
} from './components'
import './Forge.scss'

const Forge = () => {
    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedModification, setSelectedModification] = useState('-')
    const [modificationInProgress, setModificationInProgress] = useState(false)
    const [modificationComplete, setModificationComplete] = useState(false)

    return (
        <div className='forge page around'>
            {!modificationInProgress && !modificationComplete && (
                <>
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
                </>
            )}
            {modificationInProgress &&
                !modificationComplete &&
                selectedModification === 'Aqua Vitae' && (
                    <AquaVitae
                        selectedCard={selectedCard}
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
