import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '@context'
import { updateState } from '@utils'
import { ICard, IItem } from 'src/global.interfaces'

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

interface Modifiers {
    selectedCard: ICard | null
    selectedModification: string
    setModificationComplete: React.Dispatch<React.SetStateAction<boolean>>
    setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

interface ModCost {
    aquaType: IItem | null
    aquaAmount: number
    fluxType: IItem | null
    fluxAmount: number
}

type ComponentMap = {
    [key: string]: React.ComponentType<any>
}

const Modifiers = ({
    selectedCard,
    selectedModification,
    setModificationComplete,
    setModificationInProgress,
}: Modifiers) => {
    const { allItems } = useGlobalContext()

    const [selectedCardValues, setSelectedCardValues] = useState([
        ...selectedCard!.values,
    ])
    const [modCost, setModCost] = useState<ModCost>({
        aquaType: null,
        aquaAmount: 1,
        fluxType: null,
        fluxAmount: 1,
    })

    const modifiers = [...modificationOptions].slice(1)
    const componentMap: ComponentMap = {
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
                item.name.includes(selectedCard?.rarity) && item.type === 'flux'
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
