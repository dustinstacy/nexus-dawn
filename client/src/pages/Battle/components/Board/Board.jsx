import React from 'react'

import { Card } from '@components'
import { classSet } from '@utils'

import { Score } from '../../components'
import { processStandardBattles } from '../../lib/logic'
import { updateState } from '../../utils'

import { Cell } from './components'
import turnArrow from './images/turnArrow.png'

import './Board.scss'

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
    updateScores,
}) => {
    const { board, isP1Turn } = battleState

    const handleDragEnter = (e) => {
        e.target.classList.add('drag-enter')
    }

    const handleDragLeave = (e) => {
        e.target.classList.remove('drag-enter')
    }

    const handleDrop = (e) => {
        const index = parseInt(e.target.id)
        if (cardDragged) {
            const updatedBoard = [...board]
            const updatedHand = [...playerOne.hand]
            const card = playerOne.hand.find(
                (card) => card._id === cardDragged._id
            )
            if (card) {
                const cardIndex = updatedHand.indexOf(card)
                updatedHand.splice(cardIndex, 1)
                updatedBoard[index] = card
                updateState(setPlayerOne, { hand: [...updatedHand] })
                updateState(setBattleState, { board: [...updatedBoard] })
                processStandardBattles(index, cardDragged, battleState)
            }
            updateScores()
        }
        setCardDragged(null)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    // Handle process of user choosing which cell to place a card
    const placeCard = (e) => {
        const index = parseInt(e.target.id)
        if (cardSelected) {
            const updatedBoard = [...board]
            const updatedHand = [...playerOne.hand]
            const card = playerOne.hand.find(
                (card) => card._id === cardSelected._id
            )
            if (card) {
                const cardIndex = updatedHand.indexOf(card)
                updatedHand.splice(cardIndex, 1)
                updatedBoard[index] = card
                updateState(setPlayerOne, { hand: [...updatedHand] })
                updateState(setBattleState, { board: [...updatedBoard] })
                processStandardBattles(index, cardSelected, battleState)
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
        !isP1Turn && isP1Turn !== null && 'is-turn'
    )
    const turnArrowClassNames = classSet(
        'turn-arrow',
        isP1Turn && isP1Turn !== null && 'down',
        !isP1Turn && isP1Turn !== null && 'up'
    )

    return (
        <div className='board center'>
            <div className='score-column center-column'>
                <Score player={playerTwo} />
                <Score player={playerOne} />
            </div>
            <div className='grid center'>
                {board.map((contents, i) =>
                    contents === 'empty' ? (
                        <Cell
                            key={i}
                            id={i}
                            handleClick={(e) => placeCard(e)}
                            handleDragEnter={(e) => handleDragEnter(e)}
                            handleDragLeave={(e) => handleDragLeave(e)}
                            handleDragOver={(e) => handleDragOver(e)}
                            handleDrop={(e) => handleDrop(e)}
                            cardSelected={cardSelected}
                        />
                    ) : (
                        <div key={i}>
                            <Cell id={i}>
                                <Card
                                    card={contents}
                                    onClick={null}
                                    isShowing
                                />
                            </Cell>
                        </div>
                    )
                )}
            </div>
            <div className='arrow-column center-column'>
                {battleState.round > 1 && <span>{playerTwo.battleScore}</span>}
                <img
                    className={p2ImageClassNames}
                    src={playerTwo.user?.avatar}
                    alt='p2 image'
                />
                <img
                    className={turnArrowClassNames}
                    src={turnArrow}
                    alt='turn arrow'
                />
                <img
                    className={p1ImageClassNames}
                    src={playerOne.user?.image}
                    alt='p1 image'
                />
                {battleState.round > 1 && <span>{playerOne.battleScore}</span>}
            </div>
        </div>
    )
}

export default Board
