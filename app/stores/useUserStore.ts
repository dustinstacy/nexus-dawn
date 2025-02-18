import { jwtDecode } from "jwt-decode"
import { create } from "zustand"

import { User } from "@interfaces"
import { customFetch } from "@utils"

interface UserState {
    user: User | null
    setUser: (user: User | null) => void
    updateUser: () => Promise<void>
    checkForUser: () => void
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user: user }),
    updateUser: async () => {
        const token = sessionStorage?.getItem("accessToken")
        const res = await customFetch("/api/auth/current", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        set({ user: { ...res } })
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
