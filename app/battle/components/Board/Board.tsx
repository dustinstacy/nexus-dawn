import React from 'react'

import { Card } from '@components'
import { classSet } from '@utils'

import { Score } from '..'
import { battleProcessor } from '../../lib/logic'
import { updateState } from '@utils'

import { Cell } from './components'
import turnArrow from './images/turnArrow.png'

import './board.scss'
import { ICard } from '@interfaces'

interface BoardProps {
	playerOne: any
	setPlayerOne: any
	playerTwo: any
	battleState: any
	setBattleState: any
	cardSelected: any
	setCardDragged: any
	cardDragged: any
	updateScores: any
}

// Render playing board and handles all card placement functions
const Board = ({
	playerOne,
	setPlayerOne,
	playerTwo,
	battleState,
	setBattleState,
	cardSelected,
	setCardDragged,
	cardDragged,
	updateScores
}: BoardProps) => {
	const { board, isP1Turn } = battleState

	const handleDragEnter = (e: any) => {
		e.target.classList.add('drag-enter')
	}

	const handleDragLeave = (e: any) => {
		e.target.classList.remove('drag-enter')
	}

	const handleDrop = (e: any) => {
		const index = parseInt(e.target.id)
		if (cardDragged) {
			const updatedBoard = [...board]
			const updatedHand = [...playerOne.hand]
			const card = playerOne.hand.find((card: ICard) => card._id === cardDragged._id)
			if (card) {
				const cardIndex = updatedHand.indexOf(card)
				updatedHand.splice(cardIndex, 1)
				updatedBoard[index] = card
				updateState(setPlayerOne, { hand: [...updatedHand] })
				updateState(setBattleState, { board: [...updatedBoard] })
				battleProcessor(index, cardDragged, battleState)
			}
			updateScores()
		}
		setCardDragged(null)
	}

	const handleDragOver = (e: any) => {
		e.preventDefault()
	}

	// Handle process of user choosing which cell to place a card
	const placeCard = (e: any) => {
		const index = parseInt(e.target.id)
		if (cardSelected) {
			const updatedBoard = [...board]
			const updatedHand = [...playerOne.hand]
			const card = playerOne.hand.find((card: ICard) => card._id === cardSelected._id)
			if (card) {
				const cardIndex = updatedHand.indexOf(card)
				updatedHand.splice(cardIndex, 1)
				updatedBoard[index] = card
				updateState(setPlayerOne, { hand: [...updatedHand] })
				updateState(setBattleState, { board: [...updatedBoard] })
				battleProcessor(index, cardSelected, battleState)
			}
			updateScores()
		}
	}

	const p1ImageClassNames = classSet(
		'user-image',
		'p1-image',
		isP1Turn && isP1Turn !== null && 'is-turn'
	)
	const p2ImageClassNames = classSet(
		'user-image',
		'p2-image',
		!isP1Turn && isP1Turn !== null ? 'is-turn' : ''
	)
	const turnArrowClassNames = classSet(
		'turn-arrow',
		isP1Turn && isP1Turn !== null && 'down',
		!isP1Turn && isP1Turn !== null ? 'up' : ''
	)

	return (
		<div className="board center">
			<div className="score-column center-column">
				<Score player={playerTwo} />
				<Score player={playerOne} />
			</div>
			<div className="grid center">
				{board.map((contents: any, i: number) =>
					contents === 'empty' ?
						<Cell
							key={i}
							id={i}
							handleClick={(e: any) => placeCard(e)}
							handleDragEnter={(e: any) => handleDragEnter(e)}
							handleDragLeave={(e: any) => handleDragLeave(e)}
							handleDragOver={(e: any) => handleDragOver(e)}
							handleDrop={(e: any) => handleDrop(e)}
							cardSelected={cardSelected}
						>
							{' '}
						</Cell>
					:	<div key={i}>
							<Cell
								id={i}
								handleClick={undefined}
								handleDragEnter={undefined}
								handleDragLeave={undefined}
								handleDragOver={undefined}
								handleDrop={undefined}
								cardSelected={false}
							>
								<Card
									card={contents}
									handleClick={undefined}
									isShowing
								/>
							</Cell>
						</div>
				)}
			</div>
			<div className="arrow-column center-column">
				{battleState.round > 1 && <span>{playerTwo.battleScore}</span>}
				<img
					className={p2ImageClassNames}
					src={playerTwo.user?.avatar}
					alt="p2 image"
				/>
				<img
					className={turnArrowClassNames}
					src={turnArrow.src}
					alt="turn arrow"
				/>
				<img
					className={p1ImageClassNames}
					src={playerOne.user?.image}
					alt="p1 image"
				/>
				{battleState.round > 1 && <span>{playerOne.battleScore}</span>}
			</div>
		</div>
	)
}

export default Board
