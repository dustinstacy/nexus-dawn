const ordered = (a, b) => a.number - b.number

export const sortByCardNumber = (array) => {
    const sortedCards = [...array].sort(ordered)
    return sortedCards
}

export const sortByCardsInDeck = (cards, deck) => {
    const sortedCards = cards
        .filter((card) => deck.find(({ _id }) => card._id === _id))
        .sort(ordered)
    return sortedCards
}

export const sortByCardsNotInDeck = (cards, deck) => {
    const sortedCards = cards
        .filter((card) => !deck.find(({ _id }) => card._id === _id))
        .sort(ordered)
    return sortedCards
}

export const sortByRarity = (array, rarity) => {
    const sortedCards = array.filter((card) => card.rarity === rarity)
    return sortedCards
}

export const sortBySingleValue = (array, index) => {
    const sortedCards = array.sort((a, b) => {
        const aValue = a.values[index]
        const bValue = b.values[index]
        return parseInt(bValue) - parseInt(aValue)
    })

    return sortedCards
}

// Sort from greatest to least the array of cards by the sum of all the card's value
export const sortByTotalCardValue = (array) => {
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

    return sortedArray
}
