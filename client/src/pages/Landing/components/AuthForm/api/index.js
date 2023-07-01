import axios from 'axios'

// Sends a request to the appropriate endpoint based on the value of the 'register' prop.
export const sendAuthRequest = async (formData, register) => {
    try {
        // Deconstruct the formData object to extract values needed for the POST request
        const { username, email, password, confirmPassword } = formData

        // Set the data object based on the value of register prop
        const data = register
            ? { username, email, password, confirmPassword }
            : { username, password }

        const endpoint = register ? '/api/auth/register' : '/api/auth/login'
        const response = await axios.post(endpoint, data)

        // If the response contains errors, throw an error with the response data
        if (response.data.errors) {
            throw new Error(response.data.errors)
        }
    } catch (error) {
        console.error('Error authenticating user:', error)
        throw error // Rethrow the error to propagate it to the caller
    }
}
