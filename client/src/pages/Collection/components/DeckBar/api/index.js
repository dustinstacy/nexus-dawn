import axios from 'axios'

// Mark all cards in the array as selected and add all cards to the user's deck
export const addAllToDeck = async (array) => {
    const selectPromises = array.map((card) => {
        return axios.put(`/api/collection/${card._id}/select`)
    })
    const addPromises = array.map((card) => {
        const cardData = {
            _id: card._id,
            image: card.image,
            empower: card.empower,
            weaken: card.weaken,
            values: card.values,
        }
        return axios.put(`/api/deck/add`, cardData)
    })

    await axios.all(selectPromises)
    await axios.all(addPromises)
}

// Mark all cards as unselected and remove all cards from user's deck
export const removeAllFromDeck = async (deck) => {
    const unselectPromises = deck.map((card) => {
        return axios.put(`/api/collection/${card._id}/unselect`)
    })

    await axios.all(unselectPromises)
    await axios.put(`/api/deck/empty`)
}
