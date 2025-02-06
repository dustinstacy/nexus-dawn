import axios from "axios"
import { ICard } from "src/global.interfaces"

export const addSelection = async (card: ICard) => {
    await axios.put(`/api/collection/${card._id}/select`, { withCredentials: true })
    const cardData = {
        _id: card._id,
        image: card.image,
        empower: card.empower,
        weaken: card.weaken,
        values: card.values,
    }
    await axios.put(`/api/deck/add`, cardData)
}

export const removeSelection = async (card: ICard) => {
    await axios.put(`/api/collection/${card._id}/unselect`, { withCredentials: true })
    await axios.put(`/api/deck/${card._id}/remove`)
}
