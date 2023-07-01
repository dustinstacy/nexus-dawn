// Combines multiple class names into a single string
// and filters out any falsy values.
export const classSet = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export const createCardData = (card) => {
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
export const calculateDeckPower = (array) => {
    const power = array.reduce(
        (total, card) =>
            total +
            card.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            ),
        0
    )

    return power
}

// Calculate the sum of all card values within an array
export const calculateOptimizedDeck = (array, count) => {
    const sortedArray = array.sort(
        (a, b) =>
            b.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            ) -
            a.values.reduce(
                (sum, current) => parseInt(sum) + parseInt(current),
                0
            )
    )

    const optimizedDeck = sortedArray.slice(0, count)

    return optimizedDeck
}

// array: The array from which the object will be removed
// property: The property name used for comparison to find the object
// value: The value of the property to match and remove the corresponding object
export const removeObjectByValue = (array, property, value) => {
    const index = array.findIndex((obj) => obj[property] === value)
    if (index !== -1) {
        array.splice(index, 1)
    }
}

// Filters out all duplicates inside an array, returns only one instance of each unique value
export const uniqueItemsFilter = (array) => {
    return array.reduce((uniqueItems, currentItem) => {
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
