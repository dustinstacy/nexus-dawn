import { customFetch } from "@utils"
import { User } from "@interfaces"

export const handleLevelUp = async (user: User) => {
    try {
        await customFetch("/api/profile/stats", {
            method: "PUT",
            body: JSON.stringify({ level: user.level + 1 }),
        })
        await customFetch("/api/profile/info", {
            method: "PUT",
            body: JSON.stringify({
                coin: user.coin + (user.level + 1) * 1.5 * 100,
            }),
        })
    } catch (error) {
        console.error("Error updating user level:", error)
    }
}
