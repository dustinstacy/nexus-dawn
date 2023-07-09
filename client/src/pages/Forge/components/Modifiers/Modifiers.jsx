import React from 'react'

import { Button } from '@components'

import {
    AquaVitae,
    AquaRegia,
    AquaFortis,
    AquaVitaeSuperior,
    AquaRegiaSuperior,
    AquaFortisSuperior,
    AquaManna,
} from './components'
import { modificationOptions } from '../ModificationSelector/constants'
import './Modifiers.scss'

const Modifiers = ({
    selectedCard,
    selectedModification,
    setModificationComplete,
    setModificationInProgress,
}) => {
    const modifiers = [...modificationOptions].slice(1)

    const componentMap = {
        AquaVitae,
        AquaRegia,
        AquaFortis,
        AquaVitaeSuperior,
        AquaRegiaSuperior,
        AquaFortisSuperior,
        AquaManna,
    }

    return (
        <div className='modifier'>
            {modifiers.map((modifier) => {
                const Component = componentMap[modifier.replace(/\s/g, '')]
                return (
                    selectedModification === `${modifier}` && (
                        <Component
                            key={modifier}
                            selectedCard={selectedCard}
                            setModificationComplete={setModificationComplete}
                            setModificationInProgress={
                                setModificationInProgress
                            }
                        />
                    )
                )
            })}
            <Button
                label='Cancel'
                onClick={() => setModificationInProgress(false)}
            />
        </div>
    )
}

export default Modifiers
