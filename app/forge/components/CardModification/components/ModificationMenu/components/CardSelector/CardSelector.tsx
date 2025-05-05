import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Card, ModalOverlay } from '@components'
import { ICard } from '@interfaces'

import { CardListContainer } from './components'
import './cardSelector.scss'

interface CardSelector {
	selectedCard: ICard | null
	setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
}

const CardSelector = ({ selectedCard, setSelectedCard }: CardSelector) => {
	const [cardSelectOpen, setCardSelectOpen] = useState(false)

	return (
		<>
			{selectedCard ?
				<div className="selected-card center fill">
					<AiOutlineCloseCircle
						className="unselect-card"
						onClick={() => setSelectedCard?.(null)}
					/>
					<Card
						card={selectedCard}
						isShowing
					/>
					{selectedCard?.values.map((value, i) => (
						<p
							key={value + i * 10}
							className={`value-${i} center`}
						>
							{value}
						</p>
					))}
				</div>
			:	<div
					className="select-card fill center"
					onClick={() => setCardSelectOpen(true)}
				>
					<h1>+</h1>
				</div>
			}

			{cardSelectOpen && (
				<ModalOverlay>
					<CardListContainer
						setSelectedCard={setSelectedCard}
						setCardSelectOpen={setCardSelectOpen}
					/>
				</ModalOverlay>
			)}
		</>
	)
}

export default CardSelector
