import { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'

import { addCardToDeck, removeCardFromDeck } from '@api'
import { Button, Filter } from '@components'
import { ICard } from '@interfaces'
import { useUserStore } from '@stores'
import { calculateDeckPower, calculateOptimizedDeck } from '@utils'

import { removeAllFromDeck } from './api'
import './deckBar.scss'

// Renders the user's deck statistics and provides options to automatically manage the deck
const DeckBar = () => {
	const userCards = useUserStore((state) => state.userCards)
	const fetchUserCards = useUserStore((state) => state.fetchUserCards)
	const userDeck = useUserStore((state) => state.userDeck)
	const fetchUserDeck = useUserStore((state) => state.fetchUserDeck)
	const [deckCount, setDeckCount] = useState('15')
	const [fillDeckLoading, setFillDeckLoading] = useState(false)
	const [clearDeckLoading, setClearDeckLoading] = useState(false)
	const [isUpToDate, setIsUpToDate] = useState(false)
	const [userDeckPower, setUserDeckPower] = useState<number>(0)
	const [userOptimizedDeck, setUserOptimizedDeck] = useState<Array<ICard>>([])
	const [userOptimizedDeckPower, setUserOptimizedDeckPower] =
		useState<number>(0)

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

	useEffect(() => {
		const newOptimizedDeck = calculateOptimizedDeck(userCards, deckCount)
		const newOptimizedDeckPower = calculateDeckPower(newOptimizedDeck)

		setUserOptimizedDeck(newOptimizedDeck)
		setUserOptimizedDeckPower(newOptimizedDeckPower)
	}, [deckCount])

	const updateOptimizedDeckState = async () => {
		const newUserDeckPower = calculateDeckPower(userDeck)
		const newUserOptimizedDeck = calculateOptimizedDeck(userCards, deckCount)
		const newUserOptimizedDeckPower = calculateDeckPower(newUserOptimizedDeck)

		setUserDeckPower(newUserDeckPower)
		setUserOptimizedDeck(newUserOptimizedDeck)
		setUserOptimizedDeckPower(newUserOptimizedDeckPower)
	}

	const optimizeDeck = async () => {
		setFillDeckLoading(true)
		updateOptimizedDeckState()
		userDeck.forEach((card) => {
			if (
				!userOptimizedDeck.some(
					(optimizedCard) => optimizedCard._id === card._id
				)
			) {
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
		setFillDeckLoading(false)
	}

	// Sorts all cards not in the user's deck and creates an array from the
	// strongest cards equal in length to the remaining space in the deck.
	// Then handles the API requests to add the cards to the deck and updates the user data upon completion
	const autoBuild = async () => {
		optimizeDeck()
	}

	// Removes all cards from the user's deck using an API request
	// and updates the user data upon completion
	const emptyDeck = async () => {
		setClearDeckLoading(true)
		await removeAllFromDeck(userDeck)
		await fetchUserDeck()
		setClearDeckLoading(false)
	}

	// Determine the label for the fill deck button based on the fillDeckLoading state
	const fillDeckLabel =
		fillDeckLoading ?
			<CircleLoader
				color="#ffffff"
				size={24}
				loading={fillDeckLoading}
			/>
		:	'Optimize Deck'

	// Determine the label for the clear deck button based on the clearDeckLoading state
	const clearDeckLabel =
		clearDeckLoading ?
			<CircleLoader
				color="#ffffff"
				size={24}
				loading={clearDeckLoading}
			/>
		:	'Clear Deck'

	const optimizedDeckCountOptions = ['15', '25']

	return (
		<div className="deck center-column">
			<div className="deck-stats center">
				<div className="count center-column">
					<p>Cards in Deck</p>
					<p>
						<span>{userDeck.length}</span>
					</p>
				</div>
				<div className="strength center-column">
					<p>Power</p>
					{userDeckPower}
				</div>
			</div>

			<div className="section center">
				<div className="optimize-deck center">
					<Filter
						id="cardCount"
						label="Card Count"
						value={deckCount}
						setValue={setDeckCount}
						options={optimizedDeckCountOptions}
					/>
					<Button
						onClick={autoBuild}
						label={fillDeckLabel as string}
						disabled={
							userDeckPower == userOptimizedDeckPower ||
							fillDeckLoading ||
							clearDeckLoading
						}
					/>
				</div>
				<Button
					onClick={emptyDeck}
					label={clearDeckLabel as string}
					disabled={clearDeckLoading || fillDeckLoading}
				/>
			</div>
		</div>
	)
}
export default DeckBar
