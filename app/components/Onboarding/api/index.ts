import { User } from '@interfaces'
import utils from '@utils'

const { customFetch } = utils

const api = {
	// Adds empty collection and deck to user's account
	completeUserStartingData: async () => {
		await customFetch('/api/collections/', {
			method: 'POST'
		})
		await customFetch('/api/decks/', {
			method: 'POST'
		})
	},

	incrementOnboardingStage: async (user: User) => {
		await customFetch('/api/profiles/onboarding', {
			method: 'PUT',
			body: JSON.stringify({
				onboardingStage: user.onboardingStage + 1
			})
		})
	},
	skipOnboarding: async () => {
		await customFetch('/api/profiles/onboarding', {
			method: 'PUT',
			body: JSON.stringify({
				onboardingStage: 6
			})
		})
	}
}

export default api
