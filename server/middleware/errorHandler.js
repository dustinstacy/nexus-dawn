// Provides error handling middleware for routes
const errorHandler = (error, req, res, next) => {
    // Set status code equal to 500 if none is provided
    const statusCode = error.statusCode || 500
    // Set default error message
    let errorMessage = 'Internal Server Error'

    // Set default error message for these status codes
    // if one is not provided
    if (statusCode === 400) {
        errorMessage = error.errorMessage || 'Bad Request'
    } else if (statusCode === 401) {
        errorMessage = error.errorMessage || 'Unauthorized'
    } else if (statusCode === 403) {
        errorMessage = error.errorMessage || 'Forbidden'
    } else if (statusCode === 404) {
        errorMessage = error.errorMessage || 'Not Found'
    }

    // Log the error
    console.error(error)

    // Return appropriate error response based on environment
    if (process.env.NODE_ENV === 'production') {
        res.status(statusCode).json({ error: errorMessage })
    } else {
        // Include stack trace in development environment
        const errorResponse = {
            error: errorMessage,
            stack: error.stack,
        }
        res.status(statusCode).json(errorResponse)
    }
}

export default errorHandler
