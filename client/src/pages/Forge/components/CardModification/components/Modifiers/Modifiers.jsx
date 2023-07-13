import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '@context'
import { updateState } from '@utils'

import {
    AquaVitae,
    AquaRegia,
    AquaFortis,
    AquaVitaeSuperior,
    AquaRegiaSuperior,
    AquaFortisSuperior,
    AquaManna,
    CostDisplay,
} from './components'
import { modificationOptions } from './constants'
import './Modifiers.scss'

const Modifiers = ({
    selectedCard,
    selectedModification,
    setModificationComplete,
    setModificationInProgress,
}) => {
    const { allItems } = useGlobalContext()

    const [selectedCardValues, setSelectedCardValues] = useState([
        ...selectedCard.values,
    ])
    const [modCost, setModCost] = useState({
        aquaType: '',
        aquaAmount: 1,
        fluxType: '',
        fluxAmount: 1,
    })

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

    useEffect(() => {
        setAquaType()
        setFluxType()
    }, [])

    const setAquaType = () => {
        const aquaItem = allItems.find(
            (item) => item.name === selectedModification
        )
        updateState(setModCost, { aquaType: aquaItem })
    }

    const setFluxType = () => {
        const fluxItem = allItems.find(
            (item) =>
                item.name.includes(selectedCard.rarity) && item.type === 'flux'
        )
        updateState(setModCost, { fluxType: fluxItem })
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
                            selectedCardValues={selectedCardValues}
                            setSelectedCardValues={setSelectedCardValues}
                            setModificationInProgress={
                                setModificationInProgress
                            }
                        />
                    )
                )
            })}
            <CostDisplay
                modCost={modCost}
                setModificationComplete={setModificationComplete}
                selectedCard={selectedCard}
                selectedCardValues={selectedCardValues}
            />
        </div>
    )
}

export default Modifiers
