import React, { useState } from 'react'

import { AquaVitae, CardSelector, ModificationSelector } from './components'
import './Forge.scss'

const Forge = () => {
    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedModification, setSelectedModification] = useState('-')
    const [modificationInProgress, setModificationInProgress] = useState(false)

    return (
        <div className='forge page around'>
            {!modificationInProgress && (
                <>
                    <CardSelector setSelectedCard={setSelectedCard} />
                    <ModificationSelector
                        selectedModification={selectedModification}
                        setSelectedModification={setSelectedModification}
                        setModificationInProgress={setModificationInProgress}
                    />
                </>
            )}
            {modificationInProgress &&
                selectedModification === 'Aqua Vitae' && (
                    <AquaVitae
                        selectedCard={selectedCard}
                        setModificationInProgress={setModificationInProgress}
                    />
                )}
        </div>
    )
}

export default Forge
