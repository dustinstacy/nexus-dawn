import { customFetch } from "@utils"
import { ICard } from "@interfaces"

export const addSelection = async (card: ICard) => {
    await customFetch(`/api/collections/${card._id}/select`, {
        method: "PUT",
    })
    const cardData = {
        _id: card._id,
        image: card.image,
        empower: card.empower,
        weaken: card.weaken,
        values: card.values,
    }
    await customFetch(`/api/decks/${card._id}/add`, {
        method: "PUT",
        body: JSON.stringify(cardData),
    })
}

export const removeSelection = async (card: ICard) => {
    await customFetch(`/api/collections/${card._id}/unselect`, {
        method: "PUT",
    })
    await customFetch(`/api/decks/${card._id}/remove`, {
        method: "PUT",
    })
}
