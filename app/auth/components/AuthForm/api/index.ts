import { FormData, User } from '@interfaces'
import utils from '@utils'

const { customFetch } = utils

interface AuthResponse {
	accessToken: string
	user: User
}

// Sends a request to the appropriate endpoint based on the value of the 'register' prop.
export const sendAuthRequest = async (formData: FormData, register: boolean) => {
	try {
		const { username, email, password, confirmPassword } = formData

		const data = register ? { username, email, password, confirmPassword } : { username, password }

		const endpoint = register ? '/api/auth/register' : '/api/auth/login'

		const res = await customFetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(data)
		})

		return res as AuthResponse
	} catch (error: any) {
		console.error('Error authenticating user:', error.message)
		throw error
	}
}

export const sendPasswordResetRequest = async (email: string) => {
	try {
		const res = await customFetch(`/api/auth/reset-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		})

		return res
	} catch (error: any) {
		console.error('Error sending password reset request:', error.message)
		throw error
	}
}

// Sends a request to reset the user's password using the reset token
export const resetPassword = async (token: string, newPassword: string) => {
	try {
		const res = await customFetch(`/api/auth/reset-password/${token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ newPassword })
		})

		return res
	} catch (error: any) {
		console.error('Error resetting password:', error.message)
		throw error // Rethrow error for handling at the caller level
	}
}
