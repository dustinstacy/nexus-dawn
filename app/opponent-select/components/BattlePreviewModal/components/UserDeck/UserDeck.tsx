import { useEffect, useState } from 'react'

import { addCardToDeck, removeCardFromDeck } from '@api'
import { headerStyle } from '@assets'
import { Button } from '@components'
import { ICard, IOpponent } from '@interfaces'
import { useUserStore } from '@stores'
import { calculateDeckPower, calculateOptimizedDeck, classSet } from '@utils'

import './userDeck.scss'

interface UserDeckProps {
	selectedOpponent: IOpponent
}

// Renders the user's deck information.
const UserDeck = ({ selectedOpponent }: UserDeckProps) => {
	const userCards = useUserStore((state) => state.userCards)
	const userDeck = useUserStore((state) => state.userDeck)
	const fetchUserDeck = useUserStore((state) => state.fetchUserDeck)
	const fetchUserCards = useUserStore((state) => state.fetchUserCards)
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
		<div className="user-deck start-column">
			<div className="header-wrapper center">
				<img
					className="header-style"
					src={headerStyle.src}
					alt="header style"
				/>
				Equipped Deck
			</div>
			<div className="deck-wrapper fill around">
				<div className="deck-info start-column">
					<div className="user-deck-power">
						<h4>Power</h4>
						<span>{userDeckPower || 0}</span>
					</div>
					<div className="user-deck-count">
						<h4>Card Count</h4>
						<span className={countColor}>{userDeck.length}</span>
						&nbsp; / &nbsp;
						<span>{selectedOpponent.cardCount}</span>
					</div>
				</div>
				<div className="buttons start-column">
					<Button
						label="Optimize Deck"
						onClick={optimizeDeck}
						disabled={userDeckPower == userOptimizedDeckPower}
					/>
					<Button
						label="Edit Deck"
						type="link"
						path="/collection"
					/>
				</div>
			</div>
		</div>
	)
}

export default UserDeck
