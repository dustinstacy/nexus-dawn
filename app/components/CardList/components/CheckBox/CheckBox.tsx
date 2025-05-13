import { ImCheckboxChecked } from '@react-icons/all-files/im/ImCheckboxChecked'
import { ImCheckboxUnchecked } from '@react-icons/all-files/im/ImCheckboxUnchecked'

import { addCardToDeck, removeCardFromDeck } from '@api'
import { ICard } from '@interfaces'
import { useUserStore } from '@stores'

import './checkBox.scss'

interface CheckBoxProps {
	card: ICard
}

const CheckBox = ({ card }: CheckBoxProps) => {
	const userCards = useUserStore((state) => state.userCards)
	const userDeck = useUserStore((state) => state.userDeck)
	const fetchUserCards = useUserStore((state) => state.fetchUserCards)
	const fetchUserDeck = useUserStore((state) => state.fetchUserDeck)

	// Selects and adds a single card to the user's deck
	const addToDeck = async (card: ICard) => {
		let errorDisplayed = false
		if (userDeck.length < 35 && userDeck.length < userCards.length + 1) {
			await addCardToDeck(card)
			fetchUserCards()
			fetchUserDeck()
		} else {
			if (!errorDisplayed) {
				errorDisplayed = true
				alert('Your deck is currently full')
			}
		}
	}

	// Unselects and removes a single card from the user's deck
	const removeFromDeck = async (card: ICard) => {
		await removeCardFromDeck(card)
		fetchUserCards()
		fetchUserDeck()
	}

	const handleClick = async () => {
		!card.selected ? await addToDeck(card) : await removeFromDeck(card)
	}

	return (
		<div
			className="checkbox"
			onClick={handleClick}
		>
			{card.selected ?
				<ImCheckboxChecked className="check" />
			:	<ImCheckboxUnchecked className="uncheck" />}
		</div>
	)
}

export default CheckBox
