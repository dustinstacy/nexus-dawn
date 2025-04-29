import { create } from 'zustand'

import { ICard } from '@interfaces'
import { customFetch } from '@utils'

interface CardsState {
	allCards: ICard[]
	fetchCards: () => void
}

const useCardsStore = create<CardsState>((set) => ({
	allCards: [],
	fetchCards: async () => {
		try {
			const res = await customFetch('/api/cards')
			set({ allCards: res })
		} catch (error) {
			console.error(error)
		}
	}
}))

export default useCardsStore
