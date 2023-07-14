import React from 'react'

import { removeItemFromInventory } from '@api'
import { Button } from '@components'
import { useGlobalContext } from '@context'

import { updateCardValues } from '../../../../api'
import './CostDisplay.scss'

const CostDisplay = ({
    modCost,
    setModificationComplete,
    selectedCard,
    selectedCardValues,
}) => {
    const { getUserCards, user } = useGlobalContext()

    const userAquaTypeCount = user?.inventory.filter(
        (item) => item.name === modCost.aquaType.name
    ).length

    const userFluxTypeCount = user?.inventory.filter(
        (item) => item.name === modCost.fluxType.name
    ).length

    const completeMod = async () => {
        await updateCardValues(selectedCard, selectedCardValues)
        await removeItemFromInventory(user, modCost.aquaType)
        await removeItemFromInventory(user, modCost.fluxType)
        await getUserCards()
        setModificationComplete(true)
    }

    return (
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
                        (value, index) => value === selectedCardValues[index]
                    ) ||
                    selectedCardValues.includes('') ||
                    userFluxTypeCount < modCost.fluxAmount
                }
            />
        </div>
    )
}

export default CostDisplay
