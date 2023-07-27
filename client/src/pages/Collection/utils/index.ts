import { ICard, Rarity } from 'src/global.interfaces'

const ordered = (a: ICard, b: ICard) => a.number - b.number

export const sortByCardNumber = (array: Array<ICard>) => {
    const sortedCards = [...array].sort(ordered)
    return sortedCards
}

export const sortByCardsInDeck = (cards: Array<ICard>, deck: Array<ICard>) => {
    const sortedCards = cards
        .filter((card) => deck.find(({ _id }) => card._id === _id))
        .sort(ordered)
    return sortedCards
}

export const sortByCardsNotInDeck = (
    cards: Array<ICard>,
    deck: Array<ICard>
) => {
    const sortedCards = cards
        .filter((card) => !deck.find(({ _id }) => card._id === _id))
        .sort(ordered)
    return sortedCards
}

export const sortByRarity = (array: Array<ICard>, rarity: string) => {
    const sortedCards = array.filter((card) => card.rarity === rarity)
    return sortedCards
}

export const sortBySingleValue = (array: Array<ICard>, index: number) => {
    const sortedCards = array.sort((a, b) => {
        const aValue = a.values[index] as number
        const bValue = b.values[index] as number
        return bValue - aValue
    })

    return sortedCards
}

// Sort from greatest to least the array of cards by the sum of all the card's value
export const sortByTotalCardValue = (array: Array<ICard>) => {
    const sortedArray = array.sort(
        (a, b) =>
            b.values.reduce(
                (sum: number, current: number) => sum + current,
                0
            ) -
            a.values.reduce((sum: number, current: number) => sum + current, 0)
    )

    return sortedArray
}
