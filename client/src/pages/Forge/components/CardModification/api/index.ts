import axios from 'axios'
import { CardValues, ICard } from 'src/global.interfaces'

export const updateCardValues = async (card: ICard, values: CardValues) => {
    await axios.put(`/api/collection/${card._id}/update`, {
        values: values,
    })
}
