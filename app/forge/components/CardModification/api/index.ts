import { CardValues, ICard } from '@interfaces'
import { customFetch } from '@utils'

const api = {
	updateCardValues: async (card: ICard, values: CardValues) => {
		await customFetch(`/api/collections/${card._id}/update`, {
			method: 'PUT',
			body: JSON.stringify({ values })
		})
	}
}

export default api
