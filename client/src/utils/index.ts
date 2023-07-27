import { CardData, ICard } from 'src/global.interfaces'

// Helper function to simplify updating state objects
export const updateState = (setState: any, updates: any) => {
    setState((state: any) => ({ ...state, ...updates }))
}

// Combines multiple class names into a single string
// and filters out any falsy values.
export const classSet = (...classes: Array<string>) => {
    return classes.filter(Boolean).join(' ')
}

export const createCardData = (card: ICard): CardData => {
    return {
        name: card.name,
        number: card.number,
        image: card.image,
        rarity: card.rarity,
        empower: card.empower,
        weaken: card.weaken,
        values: card.values,
    }
}

// Calculate the sum of all card values within an array
export const calculateDeckPower = (array: Array<ICard>): number => {
    const power = array.reduce(
        (total: number, card: ICard) =>
            total + card.values.reduce((sum, current) => sum + current, 0),
        0
    )

    return power
}

// Calculate the sum of all card values within an array
export const calculateOptimizedDeck = (
    userCards: Array<ICard>,
    count: string
): Array<ICard> => {
    const sortedArray = userCards.sort(
        (a, b) =>
            b.values.reduce((sum, current) => sum + current, 0) -
            a.values.reduce((sum, current) => sum + current, 0)
    )

    const optimizedDeck = sortedArray.slice(0, Number(count))

    return optimizedDeck
}

interface Item {
    contents: ItemContents
    image: string
    info: string
    level: number
    name: string
    price: number
    type: string
    _id: string
}

interface ItemContents {
    count: number
    odds: any
}

// array: The array from which the object will be removed
// property: The property name used for comparison to find the object
// value: The value of the property to match and remove the corresponding object
export const removeObjectByValue = (
    userInventory: Array<Item>,
    value: string
) => {
    const index = userInventory.findIndex((obj) => obj['name'] === value)
    if (index !== -1) {
        userInventory.splice(index, 1)
    }
}

// Filters out all duplicates inside an array, returns only one instance of each unique value
export const uniqueItemsFilter = (userInventory: Array<Item>): Array<Item> => {
    return userInventory.reduce((uniqueItems: Array<Item>, currentItem) => {
        const foundItem = uniqueItems.find(
            (item) =>
                item.name === currentItem.name && item.type === currentItem.type
        )
        if (!foundItem) {
            uniqueItems.push(currentItem)
        }
        return uniqueItems
    }, [])
}
