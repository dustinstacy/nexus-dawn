import { create } from "zustand"

import {  Player } from "@interfaces"
import { customFetch } from "@utils"

interface LeaderboardState {
    rankingFilter: string
    allPlayers: Player[]
    setRankingFilter:(filter:string) => void
    fetchLeaderboard: (filter:string) => void
}

const useLeaderboardStore = create<LeaderboardState>((set) => ({
    rankingFilter:'wins',
    allPlayers: [],
    setRankingFilter: (filter) => set({ rankingFilter: filter }),
    fetchLeaderboard: async (filter) => {
        try {
            const token = sessionStorage?.getItem("accessToken")
            const res = await customFetch(`/api/profiles/leaderboardPlayers/by/${filter}`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`,
                }}
            )
            set({ allPlayers: res })
        } catch (error) {
            console.error(error)
        }
    },

}))

export default useLeaderboardStore
