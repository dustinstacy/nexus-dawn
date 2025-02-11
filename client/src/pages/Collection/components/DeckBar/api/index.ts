import axios from "axios"
import { DeckCard, ICard } from "src/global.interfaces"

// Mark all cards in the array as selected and add all cards to the user's deck
export const addAllToDeck = async (array: Array<ICard>) => {
    const selectPromises = array.map((card) => {
        return axios.put(`/api/collection/${card._id}/select`, { withCredentials: true })
    })
    const addPromises = array.map((card) => {
        const cardData = {
            _id: card._id,
            image: card.image,
            empower: card.empower,
            weaken: card.weaken,
            values: card.values,
        }
        return axios.put(`/api/deck/add`, cardData, { withCredentials: true })
    })

    await axios.all(selectPromises)
    await axios.all(addPromises)
}

// Mark all cards as unselected and remove all cards from user's deck
export const removeAllFromDeck = async (deck: Array<ICard>) => {
    const unselectPromises = deck.map((card) => {
        return axios.put(`/api/collection/${card._id}/unselect`, { withCredentials: true })
    })

    await axios.all(unselectPromises)
    await axios.put(`/api/deck/empty`, { withCredentials: true })
}
