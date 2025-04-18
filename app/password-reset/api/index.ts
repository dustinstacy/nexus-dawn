import { customFetch } from '@utils'

// Updates the user's password using their email (no reset token required)
export const updatePassword = async (token: string, newPassword: string) => {
	try {
		const res = await customFetch(`/api/auth/update-password/${token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ newPassword })
		})

		return res
	} catch (error: any) {
		console.error('Error updating password:', error.message)
		throw error // Rethrow for handling at the caller level
	}
}
