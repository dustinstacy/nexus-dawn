import { customFetch } from '@utils'
import { CardValues, ICard } from '@interfaces'

export const updateCardValues = async (card: ICard, values: CardValues) => {
	await customFetch(`/api/collections/${card._id}/update`, {
		method: 'PUT',
		body: JSON.stringify({ values })
	})
}
