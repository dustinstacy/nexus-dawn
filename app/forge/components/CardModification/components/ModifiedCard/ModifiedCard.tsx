import React, { useEffect, useState } from 'react'

import { Button, Card } from '@components'
import { ICard } from '@interfaces'
import { useUserStore } from '@stores'

import './modifiedCard.scss'

interface ModifiedCard {
	selectedCard: ICard | null
	setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
	setModificationComplete: React.Dispatch<React.SetStateAction<boolean>>
}

const ModifiedCard = ({ selectedCard, setModificationComplete, setSelectedCard }: ModifiedCard) => {
	const userCards = useUserStore((state) => state.userCards)
	const fetchUserCards = useUserStore((state) => state.fetchUserCards)

	const [updatedCard, setUpdatedCard] = useState<ICard | null>(null)

	useEffect(() => {
		updateSelectedCard()
	}, [])

	const updateSelectedCard = async () => {
		fetchUserCards()
		const updatedSelectedCard = userCards.find((card) => card._id === selectedCard?._id)
		setUpdatedCard(updatedSelectedCard ?? null)
		setSelectedCard?.(null)
	}

	return (
		<div className="mod-card center-column">
			<div className="mod-panel center">
				{updatedCard && (
					<Card
						card={updatedCard}
						isShowing
					/>
				)}
			</div>
			<Button
				label="Exit"
				onClick={() => setModificationComplete?.(false)}
			/>
		</div>
	)
}

export default ModifiedCard
