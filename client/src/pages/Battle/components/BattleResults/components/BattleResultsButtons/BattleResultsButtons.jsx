import React from 'react'
import { useNavigate } from 'react-router-dom'

import { postBattleLog } from '@api'
import { Button } from '@components'

import './BattleResultsButtons.scss'

const BattleResultsButtons = ({ loading, opponent, opponentDeck }) => {
    const navigate = useNavigate()

    const handleClick = async () => {
        const battleLog = localStorage.getItem('battleLog')
        await postBattleLog(battleLog)
        removeStateFromLocalStorage()
    }

    // Navigate to battle intro page with stored opponent and opponent deck state
    const rematch = async () => {
        await handleClick()
        navigate('/battleIntro', {
            state: {
                opponent: opponent,
                opponentDeck: opponentDeck,
            },
        })
    }

    const selectOpponent = async () => {
        await handleClick()
        navigate('/opponentSelect')
    }

    const mainMenu = async () => {
        await handleClick()
        navigate('/')
    }

    const removeStateFromLocalStorage = () => {
        localStorage.removeItem('battleLog')
    }

    return (
        <div className='results-buttons'>
            {!loading && (
                <>
                    <Button label='Select Opponent' onClick={selectOpponent} />
                    <Button label='Rematch' onClick={rematch} />
                    <Button label='Main Menu' onClick={mainMenu} />
                </>
            )}
        </div>
    )
}

export default BattleResultsButtons
