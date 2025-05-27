import { ICard } from '@interfaces'
import utils from '@utils'

const { customFetch } = utils

// Mark all cards in the array as selected and add all cards to the user's deck
export const addAllToDeck = async (array: Array<ICard>) => {
	const selectPromises = array.map((card) => {
		return customFetch(`/api/collections/${card._id}/select`, { method: 'PUT' })
	})
	const addPromises = array.map((card) => {
		const cardData = {
			_id: card._id,
			image: card.image,
			empower: card.empower,
			weaken: card.weaken,
			values: card.values
		}
		return customFetch(`/api/decks/add`, {
			method: 'PUT',
			body: JSON.stringify(cardData)
		})
	})

	await Promise.all(selectPromises)
	await Promise.all(addPromises)
}

// Mark all cards as unselected and remove all cards from user's deck
export const removeAllFromDeck = async (deck: Array<ICard>) => {
	const unselectPromises = deck.map((card) => {
		return customFetch(`/api/collections/${card._id}/unselect`, {
			method: 'PUT'
		})
	})

	await Promise.all(unselectPromises)
	await customFetch(`/api/decks/empty`, { method: 'PUT' })
}
