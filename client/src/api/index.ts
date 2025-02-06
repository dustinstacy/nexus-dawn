import axios, { AxiosResponse } from "axios"
import { removeObjectByValue } from "./../utils"
import { BattleResult, CardData, DeckCard, ICard, IItem, User } from "src/global.interfaces"

export const addCardToCollection = async (cardData: CardData) => {
    await axios.put("/api/collection/new", cardData, { withCredentials: true })
}

export const addExperience = async (user: User, xp: number) => {
    await axios.put(
        "/api/profile/stats",
        {
            xp: user.xp + xp,
        },
        { withCredentials: true }
    )
}

export const addCoin = async (user: User, amount: number) => {
    await axios.put(
        "/api/profile/info",
        {
            coin: user.coin + amount,
        },
        { withCredentials: true }
    )
}

// Mark card as selected and add card to user's deck
export const addCardToDeck = async (card: ICard) => {
    await axios.put(`/api/deck/add`, card, { withCredentials: true })
    await axios.put(`/api/collection/${card._id}/select`, { withCredentials: true })
}

export const addItemToInventory = async (user: User, item: IItem | IItem[]) => {
    let updatedInventory = [...user.inventory]

    if (Array.isArray(item)) {
        updatedInventory.push(...item)
    } else {
        updatedInventory.push(item)
    }

    await axios.put(
        "/api/profile/inventory",
        {
            inventory: updatedInventory,
        },
        { withCredentials: true }
    )
}

export const deductCoin = async (user: User, amount: number) => {
    const updatedCoin = user.coin - amount
    await axios.put(
        "/api/profile/info",
        {
            coin: updatedCoin.toString(), // Explicitly set to string to account for 0
        },
        { withCredentials: true }
    )
}

// Mark card as unselected and remove card from user's deck
export const removeCardFromDeck = async (card: DeckCard) => {
    await axios.put(`/api/deck/${card._id}/remove`, { withCredentials: true })
    await axios.put(`/api/collection/${card._id}/unselect`, { withCredentials: true })
}

export const removeItemFromInventory = async (user: User, item: IItem) => {
    removeObjectByValue(user.inventory, item.name)
    await axios.put(
        "/api/profile/inventory",
        {
            inventory: user.inventory,
        },
        { withCredentials: true }
    )
}

export const updateUserInfo = async <T extends keyof User>(property: T, value: any) => {
    try {
        await axios.put(
            "./api/profile/info",
            {
                [property]: value,
            },
            { withCredentials: true }
        )
    } catch (error) {
        console.error("Error updating user", error)
    }
}

// Update user's stats when they choose to forfeit an active battle
export const updateUserStats = async (user: User, result: BattleResult) => {
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

    await axios.put(
        "/api/profile/stats",
        {
            battles: user.stats.battles + results[0],
            wins: user.stats.wins + results[1],
            losses: user.stats.losses + results[2],
            draws: user.stats.draws + results[3],
        },
        { withCredentials: true }
    )
}

// Add battle log to database
export const postBattleLog = async (battleLog: string) => {
    await axios.post("/api/battleLogs", {
        battleLog: battleLog,
    })
}

// Get current battle number
export const getCurrentBattleNumber = async (): Promise<number> => {
    const response: AxiosResponse = await axios.get("/api/battleLogs/battleNumber")
    const battleNumber = response.data.battleNumber
    return battleNumber
}
