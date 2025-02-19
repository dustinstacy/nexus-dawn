import { create } from "zustand"

import { ICard, IOpponent } from "@interfaces"
import { customFetch } from "@utils"

interface OpponentsState {
    allOpponents: IOpponent[]
    selectedOpponent: IOpponent | null
    selectedOpponentDeck: Array<ICard> | []
    setSelectedOpponent: (opponent: IOpponent | null) => void
    setSelectedOpponentDeck: (deck: Array<ICard>) => void
    fetchOpponents: () => void
}

const useOpponentsStore = create<OpponentsState>((set) => ({
    allOpponents: [],
    selectedOpponent: null,
    selectedOpponentDeck: [],
    setSelectedOpponent: (opponent) => {
        set({ selectedOpponent: opponent })
    },
    setSelectedOpponentDeck: (deck) => {
        set({ selectedOpponentDeck: deck })
    },
    fetchOpponents: async () => {
        try {
            const res = await customFetch("/api/cpuOpponents")
            set({ allOpponents: res })
        } catch (error) {
            console.error(error)
        }
    },
}))

export default useOpponentsStore
