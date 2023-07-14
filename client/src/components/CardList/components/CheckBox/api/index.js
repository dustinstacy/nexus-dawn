import axios from 'axios'

export const addSelection = async (card) => {
    await axios.put(`/api/collection/${card._id}/select`)
    const cardData = {
        _id: card._id,
        image: card.image,
        empower: card.empower,
        weaken: card.weaken,
        values: card.values,
    }
    await axios.put(`/api/deck/add`, cardData)
}

export const removeSelection = async (card) => {
    await axios.put(`/api/collection/${card._id}/unselect`)
    await axios.put(`/api/deck/${card._id}/remove`)
}
