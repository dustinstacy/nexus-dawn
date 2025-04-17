import { useEffect, useMemo } from 'react'

import { CardList } from '@components'
import { useUserStore } from '@stores'

import * as Sorters from '../../utils'
import './cardCollection.scss'

interface CardCollectionProps {
	deckFilter: string
	rarityFilter: string
	valueFilter: string
}

// Renders all of the user's cards and provides options to filter them out
const CardCollection = ({
	deckFilter,
	rarityFilter,
	valueFilter
}: CardCollectionProps) => {
	const user = useUserStore((state) => state.user)
	const userCards = useUserStore((state) => state.userCards)
	const fetchUserCards = useUserStore((state) => state.fetchUserCards)
	const userDeck = useUserStore((state) => state.userDeck)

	useEffect(() => {
		fetchUserCards()
	}, [userDeck])

	// Applies filters to the user's cards based on the selected filter options
	const filteredCards = useMemo(() => {
		userCards.forEach((card) => {
			card.color = user?.color
		})
		let filtered = Sorters.sortByCardNumber(userCards)
		if (deckFilter === 'In Deck') {
			filtered = Sorters.sortByCardsInDeck(userCards, userDeck)
		} else if (deckFilter === 'Not In Deck') {
			filtered = Sorters.sortByCardsNotInDeck(userCards, userDeck)
		}
		if (rarityFilter && rarityFilter !== '-') {
			filtered = Sorters.sortByRarity(filtered, rarityFilter)
		}
		if (valueFilter == 'Total') {
			filtered = Sorters.sortByTotalCardValue(filtered)
		} else if (valueFilter && valueFilter !== '-') {
			const valuesArray = ['Up', 'Right', 'Down', 'Left', 'Total']
			const valueIndex = valuesArray.indexOf(valueFilter)
			filtered = Sorters.sortBySingleValue(filtered, valueIndex)
		}

		return filtered
	}, [deckFilter, rarityFilter, valueFilter, userCards, userDeck])

	return (
		<div className="card-collection start-column">
			<CardList
				cardArray={filteredCards}
				hasCheckbox
			/>
		</div>
	)
}

export default CardCollection
