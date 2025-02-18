import { jwtDecode } from "jwt-decode"
import { create } from "zustand"

import { User } from "@interfaces"
import { customFetch } from "@utils"

interface AuthState {
    user: User | null
    accessToken: string | null
    setUser: (user: User) => void
    setAccessToken: (token: string) => void
    logout: () => void
    checkToken: () => void
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    setUser: (user) => set({ user }),
    setAccessToken: (token) => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("accessToken", token)
        }
        set({ accessToken: token })
    },
    logout: () => {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("accessToken")
        }
        set({ user: null, accessToken: null })
    },
    checkToken: () => {
        console.log("Checking token...")
        if (typeof window === "undefined") return

        const token = sessionStorage?.getItem("accessToken")
        if (!token) {
            set({ user: null, accessToken: null })
            return
        }

        try {
            const decoded: any = jwtDecode(token)
            const currentTime = Date.now() / 1000
            if (decoded.exp > currentTime) {
                set({ accessToken: token })
                fetchUserFromToken(token)
            } else {
                set({ accessToken: null, user: null })
            }
        } catch (error) {
            console.error("Error checking token:", error)
            set({ accessToken: null, user: null })
        }
    },
}))

const fetchUserFromToken = async (token: string) => {
    console.log("Fetching user...")
    try {
        const res = await customFetch("/api/auth/current", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const user = res
        useAuthStore.getState().setUser(user)
    } catch (error) {
        console.error("Error fetching user:", error)
    }
}

export default useAuthStore
