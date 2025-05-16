import React from 'react'

import api from '@api'
import { Card } from '@components'
import { ICard } from '@interfaces'
import stores from '@stores'

import './cardList.scss'
import { CheckBox } from './components'

interface CardListProps {
	cardArray: Array<ICard> | null
	handleClick?: (e: React.MouseEvent<HTMLDivElement>, card: ICard) => void
	hasCheckbox?: boolean
}

const CardList = ({ cardArray, handleClick, hasCheckbox }: CardListProps) => {
	const { addCardToDeck, removeCardFromDeck } = api
	const { useUserStore } = stores
	const { userCards, userDeck, fetchUserCards, fetchUserDeck } = useUserStore((state) => state)

	// Selects and adds a single card to the user's deck
	const addToDeck = async (card: ICard) => {
		let errorDisplayed = false

		if (userDeck.length < 35 && userDeck.length < userCards.length + 1) {
			await addCardToDeck(card)
			fetchUserCards()
			fetchUserDeck()
		} else if (!errorDisplayed) {
			errorDisplayed = true
			alert('Your deck is currently full')
		}
	}

	// Unselects and removes a single card from the user's deck
	const removeFromDeck = async (card: ICard) => {
		await removeCardFromDeck(card)
		fetchUserCards()
		fetchUserDeck()
	}

	const handleCheckboxClick = async (card: ICard) => {
		if (!card.selected) {
			await addToDeck(card)
		} else {
			await removeFromDeck(card)
		}
	}

	return (
		<div className="card-list">
			{cardArray?.map((card) => (
				<div
					key={card._id}
					className="card-container"
				>
					<Card
						card={card}
						handleClick={(e: any) => handleClick?.(e, card)}
						isShowing
					/>
					{hasCheckbox ?
						<CheckBox
							card={card}
							onClick={handleCheckboxClick}
						/>
					:	null}
				</div>
			))}
		</div>
	)
}

export default CardList
