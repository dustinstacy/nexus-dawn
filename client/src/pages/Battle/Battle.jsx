import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { postBattleLog, updateUserStats } from '@api'
import { Alert, Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import { BattleResults, Board, Hand, RoundResult } from './components'
import { assignColorsAndDealCards, shuffleCards, updateState } from './utils'
import { processStandardBattles } from './lib/logic'
import { cpuMove } from './lib/ai'

import './Battle.scss'

const Battle = () => {
    const navigate = useNavigate()
    // Get user and opponent information from their respective sources
    const { user, userDeck } = useGlobalContext()
    const location = useLocation()
    const { opponent, opponentDeck } = location.state || {}

    // Initialize Player One state
    const [playerOne, setPlayerOne] = useState({
        user: user,
        name: 'p1',
        deck: [],
        hand: [],
        roundScore: 0,
        battleScore: 0,
    })

    // Initialize Player Two state
    const [playerTwo, setPlayerTwo] = useState({
        user: opponent,
        name: 'p2',
        deck: [],
        hand: [],
        roundScore: 0,
        battleScore: 0,
    })

    // Initialize Battle State
    const [battleState, setBattleState] = useState({
        board: [...new Array(9).fill('empty')],
        decksShuffled: false,
        handsDealt: false,
        battleStarted: false,
        round: 0,
        isP1Turn: null,
        roundOver: false,
        roundResults: [],
        battleOver: false,
    })

    const [alertActive, setAlertActive] = useState(false)
    const [cardDragged, setCardDragged] = useState(null)
    const [cardSelected, setCardSelected] = useState(null)

    // Destructure Battle State
    const {
        board,
        decksShuffled,
        handsDealt,
        battleStarted,
        round,
        isP1Turn,
        roundOver,
        roundResults,
        battleOver,
    } = battleState

    // Variables to track status of Player Hands and Board
    const table = [...playerTwo.hand, ...board, ...playerOne.hand]
    const emptyCells = board
        .map((cell, i) => {
            if (cell === 'empty') {
                return i
            }
            return null
        })
        .filter((index) => index !== null)

    const cpuCanAct =
        battleStarted &&
        !isP1Turn &&
        emptyCells.length !== 0 &&
        playerTwo.hand.length > 0 &&
        roundOver === false

    // Retrieve state from local storage if it exists
    // Otherwise initialize a new game
    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('battleLog'))
        setTimeout(() => {
            if (savedState) {
                restoreStateFromLocalStorage(savedState)
            } else {
                newGame()
            }
        }, 50)
    }, [])

    // Set state equal to state retrieve from local storage
    // Returns state to last move before page exit
    const restoreStateFromLocalStorage = (savedState) => {
        const lastGameState = savedState[savedState.length - 1]
        const { playerOne, playerTwo, battleState } = lastGameState
        setPlayerOne(playerOne)
        setPlayerTwo(playerTwo)
        setBattleState(battleState)
    }

    // Begin process of setting up a new game
    const newGame = () => {
        shuffleDecks()
    }

    const shuffleDecks = () => {
        shuffleCards([userDeck, opponentDeck])
        updateState(setPlayerOne, { deck: [...userDeck] })
        updateState(setPlayerTwo, { deck: [...opponentDeck] })
        updateState(setBattleState, { decksShuffled: true, round: round + 1 })
    }

    // Deal cards only once decks are shuffled and a Battle is
    // not currently under way
    useEffect(() => {
        if (decksShuffled === true && battleStarted === false) {
            dealHands()
        }
    }, [decksShuffled])

    const dealHands = () => {
        assignColorsAndDealCards(playerOne)
        assignColorsAndDealCards(playerTwo)
        updateState(setPlayerOne, {
            deck: [...playerOne.deck],
            hand: [...playerOne.hand],
            roundScore: playerOne.hand.length,
        })
        updateState(setPlayerTwo, {
            deck: [...playerTwo.deck],
            hand: [...playerTwo.hand],
            roundScore: playerTwo.hand.length,
        })
        setTimeout(() => {
            updateState(setBattleState, {
                handsDealt: true,
            })
        }, 1500)
    }

    // Decide who goes first only once hands have been dealt and
    // a Battle is not currently under way
    useEffect(() => {
        if ((handsDealt === true) & (battleStarted === false)) {
            updateState(setBattleState, {
                roundResults: Array.from(
                    { length: opponent.rounds },
                    (_, index) => {
                        return { round: index + 1, p1Score: '', p2Score: '' }
                    }
                ),
            })
            randomFirstTurn()
        }
    }, [handsDealt])

    const randomFirstTurn = () => {
        const arrowElement = document.querySelector('.turn-arrow')
        arrowElement.classList.add('start-game')
        setTimeout(() => {
            Math.random() < 0.5
                ? updateState(setBattleState, { isP1Turn: true })
                : updateState(setBattleState, { isP1Turn: false })
            arrowElement.classList.remove('start-game')
            updateState(setBattleState, { battleStarted: true })
        }, 1000)
    }

    // Save state to local storage when a new game has been initialized
    useEffect(() => {
        if (battleStarted === true) {
            saveStateToLocalStorage()
        }
    }, [battleStarted])

    const saveStateToLocalStorage = () => {
        const battleLog = JSON.parse(localStorage.getItem('battleLog')) || []

        battleLog.push({
            playerOne,
            playerTwo,
            battleState,
        })

        localStorage.setItem('battleLog', JSON.stringify(battleLog))
    }

    useEffect(() => {
        if (cpuCanAct) {
            setTimeout(() => {
                cpuTurn()
            }, 2000)
        }
    }, [isP1Turn, battleStarted, playerTwo.hand])

    const cpuTurn = () => {
        const { move, newBoard, newHand } = cpuMove(
            playerTwo.hand,
            battleState.board,
            emptyCells
        )
        processStandardBattles(move.cell, move.card, battleState)
        updateState(setPlayerTwo, { hand: newHand })
        updateState(setBattleState, { board: newBoard })
        updateScores()
    }

    const updateScores = () => {
        let p1Score = 0
        let p2Score = 0

        table.forEach((card) => {
            if (card?.color === user?.color) {
                p1Score++
            } else if (card?.color === playerTwo.user?.color) {
                p2Score++
            }
            updateState(setPlayerOne, { roundScore: p1Score })
            updateState(setPlayerTwo, { roundScore: p2Score })
        })
        endTurn()
    }

    const endTurn = () => {
        setCardSelected(null)
        updateState(setBattleState, { isP1Turn: !isP1Turn })
    }

    useEffect(() => {
        checkForRoundEnd()
    }, [isP1Turn])

    const checkForRoundEnd = () => {
        if (emptyCells.length === 0) {
            roundResult()
        } else if (emptyCells.length < 9) {
            saveStateToLocalStorage()
        }
    }

    const roundResult = () => {
        updateState(setPlayerOne, {
            battleScore: playerOne.battleScore + playerOne.roundScore,
        })
        updateState(setPlayerTwo, {
            battleScore: playerTwo.battleScore + playerTwo.roundScore,
        })
        updateRoundResults()
        setTimeout(() => {
            updateState(setBattleState, { roundOver: true })
        }, 1500)
    }

    const updateRoundResults = () => {
        const updatedRoundResults = roundResults.map((round) => {
            if (round.round === battleState.round) {
                return {
                    ...round,
                    p1Score: playerOne.roundScore,
                    p2Score: playerTwo.roundScore,
                }
            }
            return round
        })
        updateState(setBattleState, { roundResults: updatedRoundResults })
    }

    useEffect(() => {
        if (roundOver === true) {
            setTimeout(() => {
                saveStateToLocalStorage()
                checkForBattleEnd()
            }, 3000)
        }
    }, [roundOver])

    const checkForBattleEnd = () => {
        if (
            round === opponent.rounds ||
            playerOne.battleScore >
                playerTwo.battleScore + (opponent.rounds - round) * 9 ||
            playerTwo.battleScore >
                playerOne.battleScore + (opponent.rounds - round) * 9
        ) {
            updateState(setBattleState, { battleOver: true })
        } else {
            newRound()
        }
    }

    const newRound = () => {
        updateState(setPlayerOne, { hand: [] })
        updateState(setPlayerTwo, { hand: [] })
        updateState(setBattleState, {
            board: [...new Array(9).fill('empty')],
            handsDealt: false,
            roundOver: false,
            round: round + 1,
        })
    }

    useEffect(() => {
        if (handsDealt === false && round > 0) {
            setTimeout(() => {
                dealHands()
            }, 1000)
        }
    }, [handsDealt])

    // Remove state from local storage when the Battle is over
    useEffect(() => {
        if (battleOver === true) {
            saveStateToLocalStorage()
        }
    }, [battleOver])

    const forfeitBattle = async () => {
        const battleLog = localStorage.getItem('battleLog')
        await postBattleLog(battleLog)
        localStorage.removeItem('battleLog')
        await updateUserStats(user, 'loss')
        navigate('/opponentSelect')
    }

    return (
        <div className='battle page'>
            <div className='table'>
                <Hand
                    player={playerTwo}
                    battleState={battleState}
                    cardSelected={cardSelected}
                    cardDragged={cardDragged}
                    setCardSelected={setCardSelected}
                    handsDealt={handsDealt}
                />
                <Board
                    playerOne={playerOne}
                    setPlayerOne={setPlayerOne}
                    playerTwo={playerTwo}
                    battleState={battleState}
                    setBattleState={setBattleState}
                    cardSelected={cardSelected}
                    cardDragged={cardDragged}
                    setCardDragged={setCardDragged}
                    updateScores={updateScores}
                />
                <Hand
                    player={playerOne}
                    battleState={battleState}
                    cardSelected={cardSelected}
                    cardDragged={cardDragged}
                    setCardSelected={setCardSelected}
                    setCardDragged={setCardDragged}
                    handsDealt={handsDealt}
                />
            </div>
            {roundOver && !battleOver && (
                <ModalOverlay>
                    <RoundResult
                        playerOne={playerOne}
                        playerTwo={playerTwo}
                        battleState={battleState}
                    />
                </ModalOverlay>
            )}
            {battleOver && (
                <ModalOverlay>
                    <BattleResults
                        playerOne={playerOne}
                        playerTwo={playerTwo}
                        opponentDeck={opponentDeck}
                    />
                </ModalOverlay>
            )}
            {alertActive && (
                <Alert>
                    <h2>Don't be a quitter!</h2>
                    <div className='buttons'>
                        <Button
                            label='Fight on!'
                            onClick={() => setAlertActive(false)}
                        />
                        <Button
                            label='Forefeit'
                            onClick={() => forfeitBattle()}
                        />
                    </div>
                    <p>*Forfeiting will count as a loss</p>
                </Alert>
            )}
            <a
                className='hidden-button'
                onClick={() => setAlertActive(true)}
            ></a>
        </div>
    )
}

export default Battle
