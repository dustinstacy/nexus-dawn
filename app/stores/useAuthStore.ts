import { create } from "zustand"

interface AuthState {
    accessToken: string | null
    setAccessToken: (token: string) => void
    logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
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
        set({ accessToken: null })
    },
}))

export default useAuthStore
