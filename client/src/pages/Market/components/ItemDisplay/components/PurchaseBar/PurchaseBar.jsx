import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

import { deductCoin, addItemToInventory } from '@api'
import { coinImage } from '@assets'
import { useGlobalContext } from '@context'
import { Button } from '@components'

import { calculatePrice } from './utils'
import './PurchaseBar.scss'

// Renders a container displaying the purchase price and a button to initiate the purchase
const PurchaseBar = ({
    chosenItem,
    chosenQuantity,
    purchaseComplete,
    setPurchaseComplete,
    finalPrice,
    setFinalPrice,
}) => {
    const { user, getCurrentUser } = useGlobalContext()
    const { coin } = user ?? {}

    const [loading, setLoading] = useState(false)

    // Create an array representing the final purchase based on the chosen item and quantity
    const finalPurchase = Array.from(
        { length: chosenQuantity.amount },
        () => chosenItem
    )

    // Check if the user has enough coins to make the purchase
    const canPurchase = finalPrice <= (coin || 0)

    useEffect(() => {
        if (chosenItem) {
            // Calculate the final price based on the chosen item, quantity, and discount
            const calculatedPrice = calculatePrice(
                chosenItem,
                chosenQuantity.amount,
                chosenQuantity.discount
            )

            setFinalPrice(calculatedPrice)
        }
    }, [chosenItem, chosenQuantity])

    const completePurchase = async () => {
        try {
            setLoading(true)

            // Simulate loading for 1.5 seconds
            await new Promise((resolve) => setTimeout(resolve, 500))
            await deductCoin(user, finalPrice)
            await addItemToInventory(user, finalPurchase)
            await getCurrentUser()

            setLoading(false)
            setPurchaseComplete(true)
        } catch (error) {
            console.error('Error completing purchase:', error)
        }
    }

    // Reset the purchaseComplete state after 1.5 seconds if it's true
    useEffect(() => {
        if (purchaseComplete === true) {
            setTimeout(() => {
                setPurchaseComplete(false)
            }, 1500)
        }
    }, [purchaseComplete])

    // Determine the label for the purchase button based on the loading state
    const buttonLabel = loading ? (
        <ThreeCircles
            color='#ffffff'
            wrapperClass='purchase-loader'
            visible={loading}
            height={'24px'}
        />
    ) : (
        'Purchase'
    )

    return (
        <div className='purchase-bar box around'>
            {purchaseComplete ? (
                <h1>PURCHASE COMPLETE</h1>
            ) : (
                <>
                    <div className='total'>
                        Total :
                        <div className='amount center'>
                            {chosenQuantity.amount > 1 && (
                                <span className='previous-amount'>
                                    {chosenItem.price * chosenQuantity.amount}
                                </span>
                            )}
                            {finalPrice}
                            <img src={coinImage} alt='coin' />
                        </div>
                    </div>
                    <Button
                        label={buttonLabel}
                        disabled={!canPurchase}
                        onClick={completePurchase}
                    />
                </>
            )}
        </div>
    )
}

export default PurchaseBar
