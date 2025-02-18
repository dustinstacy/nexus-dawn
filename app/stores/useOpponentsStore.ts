import { create } from "zustand"

import { IOpponent } from "@interfaces"
import { customFetch } from "@utils"

interface OpponentsState {
    allOpponents: IOpponent[]
    fetchOpponents: () => void
}

const useOpponentsStore = create<OpponentsState>((set) => ({
    allOpponents: [],
    fetchOpponents: async () => {
        try {
            const res = await customFetch("/api/items")
            set({ allOpponents: res.items })
        } catch (error) {
            console.error(error)
        }
    },
}))

export default useOpponentsStore
