import React, { useEffect } from 'react'

import { classSet } from '@utils'

import './QuantitySelector.scss'

// Renders quantity options, passes and displays applicable discount
const QuantitySelector = ({
    chosenItem,
    chosenQuantity,
    setChosenQuantity,
}) => {
    // An array of quantity options, each containing an amount and a discount
    const quantityOptions = [
        { amount: 1, discount: '0' },
        { amount: 5, discount: '10%' },
        { amount: 10, discount: '15%' },
    ]

    // When the chosenItem prop changes, set the chosen quantity to the first quantity option
    useEffect(() => {
        setChosenQuantity(quantityOptions[0])
    }, [chosenItem])

    const handleQuantityChange = (quantity) => {
        setChosenQuantity(quantity)
    }

    const quantityButtonClasses = (quantity) =>
        classSet(
            'quantity-button',
            chosenQuantity.amount === quantity.amount && 'chosen'
        )

    return (
        <div className='quantity-selector center-column'>
            <h3>ChOOse Quantity :</h3>
            <div className='quantity-buttons'>
                {quantityOptions?.map((quantity) => (
                    <button
                        key={quantity.amount}
                        onClick={() => handleQuantityChange(quantity)}
                        className={quantityButtonClasses(quantity)}
                    >
                        {quantity.amount}
                    </button>
                ))}
            </div>

            <div className='discount'>
                {chosenQuantity.discount !== '0' &&
                    chosenQuantity.discount + ' Discount'}
            </div>
        </div>
    )
}

export default QuantitySelector
