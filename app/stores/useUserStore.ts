import { jwtDecode } from "jwt-decode"
import { create } from "zustand"

import { ICard, User } from "@interfaces"
import { customFetch } from "@utils"

interface UserState {
    user: User | null
    userCards: Array<ICard>
    userDeck: Array<ICard>
    setUser: (user: User | null) => void
    fetchUserCards: () => void
    fetchUserDeck: () => void
    checkForUser: () => void
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    userCards: [],
    userDeck: [],
    setUser: (user) => set({ user: user }),
    fetchUserCards: async () => {
        const token = sessionStorage?.getItem("accessToken")
        const res = await customFetch("/api/collections", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        set({ userCards: res.cards })
    },
    fetchUserDeck: async () => {
        const token = sessionStorage?.getItem("accessToken")
        const res = await customFetch("/api/decks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log("res", res)
        set({ userDeck: res.cards })
    },
    checkForUser: () => {
        if (typeof window === "undefined") return

        const token = sessionStorage?.getItem("accessToken")

        if (!token) {
            set({ user: null })
            return
        }

        try {
            const decoded: any = jwtDecode(token as string)
            const currentTime = Date.now() / 1000
            if (decoded.exp > currentTime) {
                fetchUserFromToken(token as string)
            } else {
                set({ user: null })
            }
        } catch (error) {
            console.error("Error checking token:", error)
            set({ user: null })
        }
    },
}))

const fetchUserFromToken = async (token: string) => {
    try {
        const res = await customFetch("/api/auth/current", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const user = res
        useUserStore.setState({ user: user })
    } catch (error) {
        console.error("Error fetching user:", error)
    }
}

export default useUserStore
