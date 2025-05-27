import { CardData, ICard, IItem } from '@interfaces'

import { default as customFetch } from './customFetch'

// Helper function to simplify updating state objects
const updateState = (setState: any, updates: any) => {
	setState((state: any) => ({ ...state, ...updates }))
}

// Combines multiple class names into a single string
// and filters out any falsy values.
const classSet = (...classes: Array<string>) => {
	return classes.filter(Boolean).join(' ')
}

// Helper function to conver a card object to a CardData object
const createCardData = (card: ICard): CardData => {
	return {
		name: card.name,
		number: card.number,
		image: card.image,
		rarity: card.rarity,
		empower: card.empower,
		weaken: card.weaken,
		values: card.values
	}
}

// Calculate the sum of all card values within an array
const calculateDeckPower = (array: Array<ICard>): number => {
	const power = array.reduce(
		(total: number, card: ICard) =>
			total + card.values.reduce((sum: number, current: number) => sum + current, 0),
		0
	)

	return power
}

// Calculate the sum of all card values within an array
const calculateOptimizedDeck = (userCards: Array<ICard>, count: string): Array<ICard> => {
	const sortedArray = userCards.sort(
		(a, b) =>
			b.values.reduce((sum: number, current: number) => sum + current, 0) -
			a.values.reduce((sum: number, current: number) => sum + current, 0)
	)

	const optimizedDeck = sortedArray.slice(0, Number(count))

	return optimizedDeck
}

// array: The array from which the object will be removed
// property: The property name used for comparison to find the object
// value: The value of the property to match and remove the corresponding object
const removeObjectByValue = (userInventory: Array<IItem>, value: string) => {
	const index = userInventory.findIndex((obj) => obj['name'] === value)
	if (index !== -1) {
		userInventory.splice(index, 1)
	}

	return userInventory
}

// Filters out all duplicates inside an array, returns only one instance of each unique value
const uniqueItemsFilter = (userInventory: Array<IItem>): Array<IItem> => {
	return userInventory.reduce((uniqueItems: Array<IItem>, currentItem) => {
		const foundItem = uniqueItems.find(
			(item) => item.name === currentItem.name && item.type === currentItem.type
		)
		if (!foundItem) {
			uniqueItems.push(currentItem)
		}
		return uniqueItems
	}, [])
}

const utils = {
	customFetch,
	updateState,
	classSet,
	createCardData,
	calculateDeckPower,
	calculateOptimizedDeck,
	removeObjectByValue,
	uniqueItemsFilter
}

export default utils
