// This function takes in a string and converts it to CamelCase format
// Used to map TextInput elements to their corresponding labels
export const toCamelCase = (str) => {
    return str
        .replace(/\s(.)/g, function (a) {
            return a.toUpperCase()
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function (b) {
            return b.toLowerCase()
        })
}
