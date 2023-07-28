import React from 'react'

import { IItem, ChosenQuantity } from 'src/global.interfaces'

import { ItemInformation, QuantitySelector } from './components'
import './ChosenItem.scss'

interface ChosenItem {
    chosenItem: IItem | null
    chosenQuantity: ChosenQuantity
    setChosenQuantity: React.Dispatch<React.SetStateAction<ChosenQuantity>>
}

// Renders chosen item information and a purchase quanitity selector
// chosenItem: Item currently chosen from market items
// chosenQuanityt: Quantity currently chosen
// setChosenQuantity: Function to update state of quantity chosen
const ChosenItem = ({
    chosenItem,
    chosenQuantity,
    setChosenQuantity,
}: ChosenItem) => {
    return (
        <div className='chosen-item panel between-column'>
            <ItemInformation chosenItem={chosenItem} />
            <QuantitySelector
                chosenItem={chosenItem}
                chosenQuantity={chosenQuantity}
                setChosenQuantity={setChosenQuantity}
            />
        </div>
    )
}

export default ChosenItem