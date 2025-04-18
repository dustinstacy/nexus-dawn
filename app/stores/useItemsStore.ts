import { create } from 'zustand'

import { IItem } from '@interfaces'
import { customFetch } from '@utils'

interface ItemsState {
	allItems: IItem[]
	fetchItems: () => void
}

const useItemsStore = create<ItemsState>((set) => ({
	allItems: [],
	fetchItems: async () => {
		try {
			const res = await customFetch('/api/items')
			set({ allItems: res })
		} catch (error) {
			console.error(error)
		}
	}
}))

export default useItemsStore
