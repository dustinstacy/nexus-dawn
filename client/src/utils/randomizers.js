// Helper function to generate a random integer within a specified range
const randomIntFromInterval = (min, max) => {
    // + 1 ensures a returned integer in the inclusive range
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Helper function to generate random sum of all 4 card values
// and maximum value of any single value based on the card's rarity
const setValueLimits = (card) => {
    let sumOfValues, maxSingleValue

    if (card.rarity === 'Common') {
        sumOfValues = randomIntFromInterval(6, 10)
        maxSingleValue = 5
    } else if (card.rarity === 'Uncommon') {
        sumOfValues = randomIntFromInterval(10, 14)
        maxSingleValue = 6
    } else if (card.rarity === 'Rare') {
        sumOfValues = randomIntFromInterval(14, 18)
        maxSingleValue = 7
    } else if (card.rarity === 'Epic') {
        sumOfValues = randomIntFromInterval(18, 24)
        maxSingleValue = 8
    } else if (card.rarity === 'Legendary') {
        sumOfValues = randomIntFromInterval(24, 30)
        maxSingleValue = 9
    }

    return { sumOfValues, maxSingleValue }
}

// Generates random values for a card
export const assignRandomCardValues = (card) => {
    // See setValueLimits()
    const { sumOfValues, maxSingleValue } = setValueLimits(card)

    // Create empty array to store 4 values
    let values = [...new Array(4)]
    // Variable to track sum of all 4 card values
    let sum = 0

    do {
        // Generate 4 random numbers between 0 and 1 for each value
        for (let i = 0; i < values.length; i++) {
            values[i] = Math.random()
        }
        // Get the sum of all 4 randomly generated numbers
        sum = values.reduce((sum, value) => sum + value, 0)
        // Crate scale factor to determine how much each value needs to
        // be adjusted to reach desired sum
        const scale = sumOfValues / sum
        // Scale each value proportionally without exceeding the maxSingleValue
        values = values.map((value) =>
            Math.min(maxSingleValue, Math.round(value * scale))
        )

        // Recalculate the sum to ensure sumOfValues is met
        sum = values.reduce((sum, value) => sum + value, 0)
    } while (
        // exit loop when sum - sumOfValues is equal to 0
        sum - sumOfValues
    )
    // Assign randomly generated values to the card object's 'values' property
    return (card.values = values)
}

// Assigns random values to all cards in a given deck,
// ensuring the sum of card values falls within a specified range.
// deck: Array of card objects representing the deck.
// minDeckValue: Minimum total sum of all card values allowed.
// maxDeckValue: Maximum total sum of all card values allowed.
export const assignRandomDeckValues = (deck, minDeckValue, maxDeckValue) => {
    // Variable to store the final calculated sum of all card values
    let finalValue = 0
    // Variable to store the scale factor for adjusting values
    let scale = 0

    do {
        // Assign random card values to all cards in the deck
        deck.forEach((card) => {
            assignRandomCardValues(card)
        })

        // Calculate the current sum of all card values in the deck
        const currentSum = deck.reduce((total, card) => {
            return total + card.values.reduce((sum, value) => sum + value, 0)
        }, 0)

        // Determine the scaling factor based on the current sum of values
        if (currentSum > maxDeckValue) {
            scale = maxDeckValue / currentSum
        } else if (currentSum < minDeckValue) {
            scale = minDeckValue / currentSum
        } else {
            scale = 1
        }

        // Adjust the values based on the scale to bring total within closer
        // range of the desired outcome
        deck.forEach((card) => {
            card.values = card.values.map((value) => Math.round(value * scale))
        })

        // Calculate the final sum of all card values in the deck
        finalValue = deck.reduce((total, card) => {
            if (card.values && card.values.length) {
                return (
                    total + card.values.reduce((sum, value) => sum + value, 0)
                )
            }
            return total
        }, 0)
    } while (
        // When the total value of all card values in the deck falls within range,
        // exit the loop
        finalValue < minDeckValue ||
        finalValue > maxDeckValue
    )
}

// nCards: Number of cards to return
// odds: Object containing rarity names as keys and their corresponding
// probabilities in float value (i.e. 83.1 = 83.1%)
// cardSet: Array of cards from which random cards will be selected
export const getRandomCards = (nCards, odds, cardSet) => {
    const randomCardsArray = [...new Array(nCards)]
    for (let i = 0; i < randomCardsArray.length; i++) {
        // Get random rarity based on odds
        const rarity = randomRarity(odds)
        // Filter card set to obtain cards with current rarity
        const currentRarityCards = cardSet.filter(
            (card) => card.rarity === rarity
        )
        // Selected a random card from the filtered card set
        const randomCard =
            currentRarityCards[
                Math.floor(Math.random() * currentRarityCards.length)
            ]

        randomCardsArray[i] = randomCard
    }
    return randomCardsArray
}

// odds: See getRandomCards function
export const randomRarity = (odds) => {
    // Generate a random number between 0(inclusive) and 1(exclusive)
    const num = Math.random()
    // Variable to track total odds percentage
    let totalPercentage = 0
    // Calculate the total odds percentage from the object values
    // Suggested total = 100.0
    for (const rarity in odds) {
        totalPercentage += odds[rarity]
    }
    // Variable to track the cumulative percentage
    let cumulativePercentage = 0
    // Iterate over each key (rarity) and its percentage
    for (const rarity in odds) {
        // Calculate the normalized percentage
        // normalized percentage = number between 0 and 1
        const percentage = odds[rarity] / totalPercentage
        // Accumulate the normalized percentage
        cumulativePercentage += percentage
        // Check if the generated random number falls within the
        // accumulated percentage
        // return the selected rarity
        if (num < cumulativePercentage) {
            return rarity
        }
    }
}
