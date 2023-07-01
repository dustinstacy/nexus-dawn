import React, { useEffect, useState } from 'react'

import { postBattleLog, updateUserStats } from '@api'
import { Alert, Button } from '@components'
import { useGlobalContext } from '@context'

import { BattlePreviewModal, OpponentCard } from './components'

import './OpponentSelect.scss'

// Renders a menu of CPU opponents to select from.
// Displays alert if saved battle state exists.
const OpponentSelect = () => {
    const { allOpponents, user } = useGlobalContext()
    const [selectedOpponent, setSelectedOpponent] = useState(null)
    const [alertActive, setAlertActive] = useState(false)

    const sortedOpponents = allOpponents.sort((a, b) => a.level - b.level)

    // Check for a saved battle state when component mounts.
    // If saved state exists, display the battle alert.
    // Otherwise, fetch the list of opponents
    useEffect(() => {
        const savedState = localStorage.getItem('battleLog')
        if (savedState) {
            setAlertActive(true)
        }
    }, [alertActive])

    const forfeitBattle = async () => {
        const battleLog = localStorage.getItem('battleLog')
        await postBattleLog(battleLog)
        localStorage.removeItem('battleLog')
        await updateUserStats(user, 'loss')
        setAlertActive((current) => !current)
    }

    return (
        <div className='opponent-select page center'>
            <div className='background fill' />
            <div className='header'>
                <h1>Choose your opponent</h1>
                <hr />
            </div>
            <div className='opponent-list center'>
                {sortedOpponents?.length &&
                    sortedOpponents?.map((opponent) => (
                        <OpponentCard
                            key={opponent.name}
                            opponent={opponent}
                            selectedOpponent={selectedOpponent}
                            setSelectedOpponent={setSelectedOpponent}
                        />
                    ))}
            </div>
            {alertActive && (
                <Alert>
                    <h2>You currently have an unfinished battle</h2>
                    <div className='buttons'>
                        <Button label='Rejoin' path='/battle' type='link' />
                        <Button
                            label='Forefeit'
                            onClick={() => forfeitBattle()}
                        />
                    </div>
                    <p>*Forfeiting will count as a loss</p>
                </Alert>
            )}
            {selectedOpponent && (
                <BattlePreviewModal
                    selectedOpponent={selectedOpponent}
                    setSelectedOpponent={setSelectedOpponent}
                />
            )}
        </div>
    )
}

export default OpponentSelect
