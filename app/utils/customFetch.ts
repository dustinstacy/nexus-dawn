// Custom fetch wrapper to handle common fetch logic
const customFetch = async (url: string, options: RequestInit = {}) => {
    // Set the base URL for the API
    const baseUrl = process.env.API_BASE_URL
    const token = sessionStorage.getItem("accessToken")

    // Merge the default headers with the options headers
    const config = {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }

    // Fetch the data
    const res = await fetch(`${baseUrl}${url}`, config)

    // If the response is not OK, throw an error
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`)
    }

    // Return the JSON response
    return res.json()
}

export default customFetch
