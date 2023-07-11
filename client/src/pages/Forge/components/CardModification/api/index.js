import axios from 'axios'

export const updateCardValues = async (card, values) => {
    await axios.put(`/api/collection/${card._id}/update`, {
        values: values,
    })
}
