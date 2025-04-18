import { useState } from 'react'

import { IItem, ChosenQuantity } from '@interfaces'
import { UserInventory } from '@components'

import { PurchaseBar, ChosenItem } from './components'
import './itemDisplay.scss'

interface ItemDisplay {
	chosenItem: IItem | null
}

// Represents the parent component for all the components related to the chosen items and user coin display.
const ItemDisplay = ({ chosenItem }: ItemDisplay) => {
	const [chosenQuantity, setChosenQuantity] = useState<ChosenQuantity>({
		amount: 1,
		discount: '0'
	})
	const [finalPrice, setFinalPrice] = useState(0)
	const [purchaseComplete, setPurchaseComplete] = useState(false)

	return (
		<div className="item-display start-column">
			<div className="inventory-bar panel end">
				<UserInventory />
				{purchaseComplete && <p className="coin-deduction">-{finalPrice}</p>}
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
						chosenQuantity={chosenQuantity as ChosenQuantity}
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
