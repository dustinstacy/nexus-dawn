import React, { useState } from 'react'

import { UserInventory } from '@components'

import { PurchaseBar, ChosenItem } from './components'
import './ItemDisplay.scss'

// Represents the parent component for all the components related to the chosen items and user coin display.
const ItemDisplay = ({ chosenItem }) => {
    const [chosenQuantity, setChosenQuantity] = useState({})
    const [finalPrice, setFinalPrice] = useState(0)
    const [purchaseComplete, setPurchaseComplete] = useState(false)

    return (
        <div className='item-display start-column'>
            <div className='inventory-bar panel end'>
                <UserInventory />
                {purchaseComplete && (
                    <p className='coin-deduction'>-{finalPrice}</p>
                )}
            </div>
            {chosenItem && (
                <>
                    <ChosenItem
                        chosenItem={chosenItem}
                        chosenQuantity={chosenQuantity}
                        setChosenQuantity={setChosenQuantity}
                    />
                    <PurchaseBar
                        chosenItem={chosenItem}
                        chosenQuantity={chosenQuantity}
                        purchaseComplete={purchaseComplete}
                        setPurchaseComplete={setPurchaseComplete}
                        finalPrice={finalPrice}
                        setFinalPrice={setFinalPrice}
                    />
                </>
            )}
        </div>
    )
}

export default ItemDisplay
