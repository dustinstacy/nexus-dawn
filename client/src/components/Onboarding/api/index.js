import axios from 'axios'

// Adds empty collection and deck to user's account
export const completeUserStartingData = async () => {
    await axios.post('/api/collection/')
    await axios.post('/api/deck/')
}

export const incrementOnboardingStage = async (user) => {
    await axios.put('/api/profile/onboarding', {
        onboardingStage: user.onboardingStage + 1,
    })
}

export const skipOnboarding = async (user) => {
    await axios.put('/api/profile/onboarding', {
        onboardingStage: user.onboardingStage + 6,
    })
}
