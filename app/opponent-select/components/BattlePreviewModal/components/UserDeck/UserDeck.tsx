import { useEffect, useState } from 'react'

import api from '@api'
import { headerStyle } from '@assets'
import { Button } from '@components'
import { ICard, IOpponent } from '@interfaces'
import stores from '@stores'
import utils from '@utils'

import './userDeck.scss'

interface UserDeckProps {
	selectedOpponent: IOpponent
}

// Renders the user's deck information.
const UserDeck = ({ selectedOpponent }: UserDeckProps) => {
	const { calculateDeckPower, calculateOptimizedDeck, classSet } = utils
	const { addCardToDeck, removeCardFromDeck } = api
	const { userCards, userDeck, fetchUserDeck, fetchUserCards } = stores.useUserStore(
		(state) => state
	)
	const [userDeckPower, setUserDeckPower] = useState<number>(0)
	const [userOptimizedDeck, setUserOptimizedDeck] = useState<Array<ICard>>([])
	const [userOptimizedDeckPower, setUserOptimizedDeckPower] = useState<number>(0)
	const [isUpToDate, setIsUpToDate] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			await fetchUserDeck()
			await fetchUserCards()
			setIsUpToDate(true)
		}

		fetchData()

		return () => {
			setIsUpToDate(false)
		}
	}, [])

	useEffect(() => {
		if (isUpToDate) {
			updateOptimizedDeckState()
		}
	}, [isUpToDate])

	useEffect(() => {
		updateOptimizedDeckState()
	}, [userDeck])

	const updateOptimizedDeckState = async () => {
		const newUserDeckPower = calculateDeckPower(userDeck)
		const newUserOptimizedDeck = calculateOptimizedDeck(
			userCards,
			String(selectedOpponent.cardCount)
		)

		const newUserOptimizedDeckPower = calculateDeckPower(newUserOptimizedDeck)

		setUserDeckPower(newUserDeckPower)
		setUserOptimizedDeck(newUserOptimizedDeck)
		setUserOptimizedDeckPower(newUserOptimizedDeckPower)
	}

	const optimizeDeck = async () => {
		updateOptimizedDeckState()
		userDeck.forEach((card) => {
			if (!userOptimizedDeck.some((optimizedCard) => optimizedCard._id === card._id)) {
				removeCardFromDeck(card)
			}
		})
		userOptimizedDeck.forEach((optimizedCard) => {
			if (!userDeck.some((card) => card._id === optimizedCard._id)) {
				addCardToDeck(optimizedCard)
			}
		})
		await fetchUserCards()
		await fetchUserDeck()
	}
	const countColor = classSet(userDeck?.length === selectedOpponent.cardCount ? 'valid' : 'invalid')

	return (
		<div
			className="user-deck start-column"
			data-cy="user-deck"
		>
			<div
				className="header-wrapper center"
				data-cy="header-wrapper"
			>
				<img
					className="header-style"
					src={headerStyle.src}
					alt="header style"
					data-cy="header-style"
				/>
				Equipped Deck
			</div>
			<div className="deck-wrapper fill around">
				<div className="deck-info start-column">
					<div className="user-deck-power">
						<h4>Power</h4>
						<span data-cy="user-deck-power-value">{userDeckPower || 0}</span>
					</div>
					<div
						className="user-deck-count"
						data-cy="user-deck-count"
					>
						<h4>Card Count</h4>
						<span
							className={countColor}
							data-cy="user-deck-length"
						>
							{userDeck.length}
						</span>{' '}
						/ <span>{selectedOpponent.cardCount}</span>
					</div>
				</div>
				<div className="buttons start-column">
					<Button
						label="Optimize Deck"
						onClick={optimizeDeck}
						disabled={userDeckPower == userOptimizedDeckPower}
						dataCy="optimize-deck-button"
					/>
					<Button
						label="Edit Deck"
						path="/collection"
						dataCy="edit-deck-button"
					/>
				</div>
			</div>
		</div>
	)
}

export default UserDeck
