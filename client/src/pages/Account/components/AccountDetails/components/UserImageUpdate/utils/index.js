// Validate that the entered string is a image url
export const validateURL = async (str) => {
    const imageRegex = /\.(jpeg|jpg|gif|png)$/i

    if (!imageRegex.test(str)) {
        throw new Error('Invalid image URL')
    }
}
