import { FormData, User } from "@interfaces"
import { customFetch } from "@utils"

interface AuthResponse {
    accessToken: string
    user: User
}

// Sends a request to the appropriate endpoint based on the value of the 'register' prop.
export const sendAuthRequest = async (formData: FormData, register: boolean) => {
    try {
        // Deconstruct the formData object to extract values needed for the POST request
        const { username, email, password, confirmPassword } = formData

        // Set the data object based on the value of register prop
        const data = register ? { username, email, password, confirmPassword } : { username, password }

        // Set the endpoint based on the value of register prop
        const endpoint = register ? "/api/auth/register" : "/api/auth/login"

        // Send a POST request to the endpoint with the data object as the body
        const res = await customFetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        })

        // Return the response data
        return res as AuthResponse
    } catch (error: any) {
        console.error("Error authenticating user:", error.message)
        throw error // Rethrow the error to propagate it to the caller
    }
}
