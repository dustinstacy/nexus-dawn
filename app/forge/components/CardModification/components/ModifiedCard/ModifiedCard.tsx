import React, { useEffect, useState } from 'react'

import { Button, Card } from '@components'
import { ICard } from '@interfaces'
import stores from '@stores'

import './modifiedCard.scss'

interface ModifiedCard {
	selectedCard: ICard | null
	setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
	setModificationComplete: React.Dispatch<React.SetStateAction<boolean>>
}

const ModifiedCard = ({ selectedCard, setModificationComplete, setSelectedCard }: ModifiedCard) => {
	const { userCards, fetchUserCards } = stores.useUserStore((state) => state)
	const [updatedCard, setUpdatedCard] = useState<ICard | null>(null)

	useEffect(() => {
		const updateSelectedCard = async () => {
			await fetchUserCards()

			const updatedSelectedCard = userCards.find((card) => card._id === selectedCard?._id)

			setUpdatedCard(updatedSelectedCard ?? null)
			setSelectedCard?.(null)
		}

		updateSelectedCard()
	}, [])

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
				dataCy="exit-modification"
			/>
		</div>
	)
}

export default ModifiedCard
