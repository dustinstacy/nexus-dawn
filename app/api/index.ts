import { customFetch } from "@utils"
import { BattleResult, CardData, DeckCard, ICard, IItem, User } from "@interfaces"

import { removeObjectByValue } from "../utils"

export const addCardToCollection = async (cardData: CardData) => {
    await customFetch("/api/collections/new", {
        method: "PUT",
        body: JSON.stringify(cardData),
    })
}

export const addExperience = async (user: User, xp: number) => {
    await customFetch("/api/profiles/stats", {
        method: "PUT",
        body: JSON.stringify({
            xp: user.xp + xp,
        }),
    })
}

export const addCoin = async (user: User, amount: number) => {
    await customFetch("/api/profiles/info", {
        method: "PUT",
        body: JSON.stringify({
            coin: user.coin + amount,
        }),
    })
}

// Mark card as selected and add card to user's deck
export const addCardToDeck = async (card: ICard) => {
    await customFetch(`/api/decks/add`, {
        method: "PUT",
        body: JSON.stringify(card),
    })
    await customFetch(`/api/collections/${card._id}/select`, {
        method: "PUT",
    })
}

export const addItemToInventory = async (user: User, item: IItem | IItem[]) => {
    const updatedInventory = [...user.inventory]
    if (Array.isArray(item)) {
        updatedInventory.push(...item)
    } else {
        updatedInventory.push(item)
    }

    await customFetch("/api/profiles/inventory", {
        method: "PUT",
        body: JSON.stringify({
            inventory: updatedInventory,
        }),
    })
}

export const deductCoin = async (user: User, amount: number) => {
    const updatedCoin = user.coin - amount
    await customFetch("/api/profiles/info", {
        method: "PUT",
        body: JSON.stringify({
            coin: updatedCoin,
        }),
    })
}

// Mark card as unselected and remove card from user's deck
export const removeCardFromDeck = async (card: DeckCard) => {
    await customFetch(`/api/decks/${card._id}/remove`, {
        method: "PUT",
    })
    await customFetch(`/api/collections/${card._id}/unselect`, {
        method: "PUT",
    })
}

export const removeItemFromInventory = async (user: User, item: IItem) => {
    const updatedInventory = removeObjectByValue(user.inventory, item.name)
    await customFetch("/api/profiles/inventory", {
        method: "PUT",
        body: JSON.stringify({
            inventory: updatedInventory,
        }),
    })
}

export const updateUserInfo = async <T extends keyof User>(property: T, value: any) => {
    await customFetch("/api/profiles/info", {
        method: "PUT",
        body: JSON.stringify({
            [property]: value,
        }),
    })
}

// Update user's stats when they choose to forfeit an active battle
export const updateUserStats = async (user: User, result: string) => {
    let results: Array<number> = []
    switch (result) {
        case "win":
            results = [1, 1, 0, 0]
            break
        case "loss":
            results = [1, 0, 1, 0]
            break
        case "draw":
            results = [1, 0, 0, 1]
            break
        default:
            break
    }
    console.log(user.stats)
    await customFetch("/api/profiles/stats", {
        method: "PUT",
        body: JSON.stringify({
            battles: user.stats.battles + results[0],
            wins: user.stats.wins + results[1],
            losses: user.stats.losses + results[2],
            draws: user.stats.draws + results[3],
        }),
    })
}

// Add battle log to database
export const postBattleLog = async (battleLog: string) => {
    // Parse the battle log string into an array of objects
    const parsedBattleLog = JSON.parse(battleLog)

    // Map through each battle log object and reduce it
    const reducedBattleLogs = parsedBattleLog.map((battleLogObj: any) => {
        return {
            battleState: {
                isP1Turn: battleLogObj.battleState.isP1Turn,
                round: battleLogObj.battleState.round,
                board: battleLogObj.battleState.board,
            },
            playerOneData: {
                battleScore: battleLogObj.playerOneData.battleScore,
                roundScore: battleLogObj.playerOneData.roundScore,
                hand: battleLogObj.playerOneData.hand,
            },
            playerTwoData: {
                battleScore: battleLogObj.playerTwoData.battleScore,
                roundScore: battleLogObj.playerTwoData.roundScore,
                hand: battleLogObj.playerTwoData.hand,
            },
        }
    })

    // Send the reduced battle logs to the server
    await customFetch("/api/battleLogs", {
        method: "POST",
        body: JSON.stringify({
            battleLog: reducedBattleLogs, // Note: "battleLogs" should match your server's expected body format
        }),
    })
}

// Get current battle number
export const getCurrentBattleNumber = async (): Promise<number> => {
    const res = await customFetch("/api/battleLogs/battleNumber", {
        method: "GET",
    })
    return res.battleNumber
}
