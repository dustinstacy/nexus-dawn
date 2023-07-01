// Helper function to simplify updating state
export const updateState = (setState, updates) => {
    setState((state) => ({ ...state, ...updates }))
}

export const shuffleCards = (decks) => {
    return decks.map((cards) => {
        let i = cards.length,
            temporary,
            random
        while (i !== 0) {
            random = Math.floor(Math.random() * i)
            i--
            temporary = cards[i]
            cards[i] = cards[random]
            cards[random] = temporary
        }
        return cards
    })
}

export const assignColorsAndDealCards = (player) => {
    const { deck, hand, user } = player
    deck.forEach((card) => (card.color = user.color))
    const handSize = 5
    let i = 0
    do {
        hand.push(deck.shift()), i++
    } while (i < handSize)
}
