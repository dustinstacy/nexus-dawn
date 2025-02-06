import axios from "axios"
import { User } from "src/global.interfaces"

// Adds empty collection and deck to user's account
export const completeUserStartingData = async () => {
    await axios.post("/api/collection/", { withCredentials: true })
    await axios.post("/api/deck/")
}

export const incrementOnboardingStage = async (user: User) => {
    await axios.put(
        "/api/profile/onboarding",
        {
            onboardingStage: user.onboardingStage + 1,
        },
        { withCredentials: true }
    )
}

export const skipOnboarding = async (user: User) => {
    await axios.put(
        "/api/profile/onboarding",
        {
            onboardingStage: user.onboardingStage + 6,
        },
        { withCredentials: true }
    )
}
