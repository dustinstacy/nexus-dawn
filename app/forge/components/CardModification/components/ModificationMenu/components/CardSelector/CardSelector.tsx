import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import React, { useState } from 'react'

import { Card, ModalOverlay } from '@components'
import { ICard } from '@interfaces'

import './cardSelector.scss'
import { CardListContainer } from './components'

interface CardSelector {
	selectedCard: ICard | null
	setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
}

const CardSelector = ({ selectedCard, setSelectedCard }: CardSelector) => {
	const [cardSelectOpen, setCardSelectOpen] = useState(false)

	return (
		<>
			{selectedCard ?
				<div
					className="selected-card center fill"
					data-cy="selected-card"
				>
					<AiOutlineCloseCircle
						className="unselect-card"
						onClick={() => setSelectedCard?.(null)}
						data-cy="unselect-card"
					/>
					<Card
						card={selectedCard}
						isShowing
					/>
					{selectedCard?.values.map((value, i) => (
						<p
							key={value + i * 10}
							className={`value-${i} center`}
							data-cy={`value-${i}`}
						>
							{value}
						</p>
					))}
				</div>
			:	<div
					className="select-card fill center"
					onClick={() => setCardSelectOpen(true)}
					data-cy="select-card"
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
