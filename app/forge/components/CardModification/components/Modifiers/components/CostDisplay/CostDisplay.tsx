import React from "react"

import { removeItemFromInventory } from "@api"
import { Button } from "@components"
import { CardValues, ICard, IItem, User } from "@interfaces"
import { useUserStore } from "@stores"

import { updateCardValues } from "../../../../api"
import "./costDisplay.scss"

interface CostDipslay {
    modCost: {
        aquaType: IItem | null
        aquaAmount: number
        fluxType: IItem | null
        fluxAmount: number
    }
    setModificationComplete: React.Dispatch<React.SetStateAction<boolean>>
    selectedCard: ICard | null
    setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
    selectedCardValues: Array<number | string>
}

const CostDisplay = ({
    modCost,
    setModificationComplete,
    selectedCard,
    setSelectedCard,
    selectedCardValues,
}: CostDipslay) => {
    const user = useUserStore((state) => state.user)
    const userCards = useUserStore((state) => state.userCards)
    const fetchUserCards = useUserStore((state) => state.fetchUserCards)
    const fetchUserData = useUserStore((state) => state.fetchUserData)

    const userAquaTypeCount = user?.inventory.filter((item) => item.name === modCost.aquaType?.name).length

    const userFluxTypeCount = user?.inventory.filter((item) => item.name === modCost.fluxType?.name).length

    const completeMod = async () => {
        await updateCardValues(selectedCard as ICard, selectedCardValues as CardValues)
        await removeItemFromInventory(user as User, modCost.aquaType as IItem)
        await removeItemFromInventory(user as User, modCost.fluxType as IItem)
        setSelectedCard(userCards.find((card) => card._id === selectedCard?._id) as ICard)
        fetchUserCards()
        fetchUserData("inventory")
        setModificationComplete(true)
    }

    return (
        <div className='cost-bar box start-column'>
            <div className='mod-cost center'>
                <div className='aqua-cost center'>
                    <img src={modCost.aquaType?.image} alt={modCost.aquaType?.name} />
                    <div className='cost center'>
                        <span>{userAquaTypeCount}</span>
                        <p>/</p>
                        <span>{modCost.aquaAmount}</span>
                    </div>
                </div>
                <div className='flux-cost center'>
                    <img src={modCost.fluxType?.image} alt={modCost.fluxType?.name} />
                    <div
                        className={`cost center ${
                            (userFluxTypeCount as number) < modCost.fluxAmount && "insufficient"
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
                    selectedCard?.values.every((value, index) => value === selectedCardValues[index]) ||
                    selectedCardValues.includes("") ||
                    (userFluxTypeCount as number) < modCost.fluxAmount
                }
            />
        </div>
    )
}

export default CostDisplay
