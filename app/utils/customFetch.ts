// Custom fetch wrapper to handle common fetch logic
const customFetch = async (url: string, options: RequestInit = {}) => {
	// Set the base URL for the API
	const baseUrl =
		process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
	const token = sessionStorage.getItem('accessToken')

	// Merge the default headers with the options headers
	const config = {
		...options,
		headers: {
			...options.headers,
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	}

	// Fetch the data
	const res = await fetch(`${baseUrl}${url}`, config)

	// If the response is not OK, throw an error
	if (!res.ok) {
		const errorData = await res.json()
		throw new Error(JSON.stringify(errorData))
	}

	// Return the JSON response
	return res.json()
}

export default customFetch
