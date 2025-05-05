import React from 'react'

import { Card } from '@components'
import { ICard } from '@interfaces'

import { CheckBox } from './components'
import './cardList.scss'

interface CardListProps {
	cardArray: Array<ICard> | null
	handleClick?: (e: React.MouseEvent<HTMLDivElement>, card: ICard) => void
	hasCheckbox?: boolean
}

const CardList = ({ cardArray, handleClick, hasCheckbox }: CardListProps) => {
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
					{hasCheckbox && <CheckBox card={card} />}
				</div>
			))}
		</div>
	)
}

export default CardList
