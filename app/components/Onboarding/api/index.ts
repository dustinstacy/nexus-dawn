import { User } from "@interfaces"
import { customFetch } from "@utils"

// Adds empty collection and deck to user's account
export const completeUserStartingData = async () => {
    await customFetch("/api/collections/", {
        method: "POST",
    })
    await customFetch("/api/decks/", {
        method: "POST",
    })
}

export const incrementOnboardingStage = async (user: User) => {
    await customFetch("/api/profiles/onboarding", {
        method: "PUT",
        body: JSON.stringify({
            onboardingStage: user.onboardingStage + 1,
        }),
    })
}

export const skipOnboarding = async (user: User) => {
    await customFetch("/api/profiles/onboarding", {
        method: "PUT",
        body: JSON.stringify({
            onboardingStage: 6,
        }),
    })
}
