import React, { useEffect, useState } from 'react'

import { removeItemFromInventory } from '@api'
import { Button } from '@components'
import { useGlobalContext } from '@context'
import { updateState } from '@utils'

import { updateCardValues } from '../../api'
import {
    AquaVitae,
    AquaRegia,
    AquaFortis,
    AquaVitaeSuperior,
    AquaRegiaSuperior,
    AquaFortisSuperior,
    AquaManna,
} from './components'
import { modificationOptions } from './constants'
import './Modifiers.scss'

const Modifiers = ({
    selectedCard,
    selectedModification,
    setModificationComplete,
    setModificationInProgress,
}) => {
    const { allItems, getUserCards, user } = useGlobalContext()

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

    const userAquaTypeCount = user?.inventory.filter(
        (item) => item.name === modCost.aquaType.name
    ).length

    const setFluxType = () => {
        const fluxItem = allItems.find(
            (item) =>
                item.name.includes(selectedCard.rarity) && item.type === 'flux'
        )
        updateState(setModCost, { fluxType: fluxItem })
    }

    const completeMod = async () => {
        await updateCardValues(selectedCard, selectedCardValues)
        await removeItemFromInventory(user, modCost.aquaType)
        await removeItemFromInventory(user, modCost.fluxType)
        await getUserCards()
        setModificationComplete(true)
    }

    const userFluxTypeCount = user?.inventory.filter(
        (item) => item.name === modCost.fluxType.name
    ).length

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
            <div className='cost-bar box start-column'>
                <div className='mod-cost center'>
                    <div className='aqua-cost center'>
                        <img
                            src={modCost.aquaType.image}
                            alt={modCost.aquaType.name}
                        />
                        <div className='cost center'>
                            <span>{userAquaTypeCount}</span>
                            <p>/</p>
                            <span>{modCost.aquaAmount}</span>
                        </div>
                    </div>
                    <div className='flux-cost center'>
                        <img
                            src={modCost.fluxType.image}
                            alt={modCost.fluxType.name}
                        />
                        <div
                            className={`cost center ${
                                userFluxTypeCount < modCost.fluxAmount &&
                                'insufficient'
                            }`}
                        >
                            <span>{userFluxTypeCount}</span>
                            <p>/</p>
                            <span>{modCost.fluxAmount}</span>
                        </div>
                    </div>
                </div>
                <Button
                    label='Complete Modification'
                    onClick={() => completeMod()}
                    disabled={
                        selectedCard.values.every(
                            (value, index) =>
                                value === selectedCardValues[index]
                        ) ||
                        selectedCardValues.includes('') ||
                        userFluxTypeCount < modCost.fluxAmount
                    }
                />
            </div>
        </div>
    )
}

export default Modifiers
