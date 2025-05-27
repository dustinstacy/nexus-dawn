import { CardValues, ICard } from '@interfaces'
import utils from '@utils'

const api = {
	updateCardValues: async (card: ICard, values: CardValues) => {
		await utils.customFetch(`/api/collections/${card._id}/update`, {
			method: 'PUT',
			body: JSON.stringify({ values })
		})
	}
}

export default api
