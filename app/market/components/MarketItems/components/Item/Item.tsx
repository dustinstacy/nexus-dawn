import React from 'react'

import { coinImage } from '@assets'
import { IItem } from '@interfaces'
import { classSet } from '@utils'

import './item.scss'

interface ItemComponent {
	item: IItem
	index: number
	chosenItem: IItem | null
	setChosenItem: React.Dispatch<React.SetStateAction<IItem | null>>
	allItems: Array<IItem>
}

// Renders a single item in the Market menu
// item: Object containing all item data
// index: Item's location index within the market items array
// chosenItem: State used to track the currently chosen item
// setChosenItem: Function to update the chosen item state based on user selection
// allItems: Array containing all market items
const Item = ({
	item,
	index,
	chosenItem,
	setChosenItem,
	allItems
}: ItemComponent) => {
	const itemClasses = (item: IItem) =>
		classSet('item', 'between', chosenItem === item ? 'chosen' : '')

	return (
		<div
			onClick={() => setChosenItem(allItems[index])}
			className={itemClasses(item)}
		>
			<div className="section center">
				<img
					src={item.image}
					alt="item image"
				/>
				<div className="item-name">{item.name}</div>
			</div>
			<div className="item-price center">
				{item.price}{' '}
				<img
					src={coinImage.src}
					alt="coin"
				/>
			</div>
		</div>
	)
}

export default Item
