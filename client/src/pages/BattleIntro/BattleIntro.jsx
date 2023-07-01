import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import './BattleIntro.scss'

const BattleIntro = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useGlobalContext()

    const { opponent, opponentDeck } = location.state || {}

    // Navigate to battle page with stored opponent and opponent deck state after animation
    useEffect(() => {
        setTimeout(() => {
            navigate('/battle', {
                state: {
                    opponent: opponent,
                    opponentDeck: opponentDeck,
                },
            })
        }, 4000)
    }, [])

    return (
        <ModalOverlay>
            <div className='battle-intro fill between-column'>
                <div className='p2-intro start'>
                    <img
                        src={opponent?.avatar}
                        style={{ background: opponent?.color }}
                        alt='p2 image'
                    />
                    <h2>{opponent?.name}</h2>
                </div>
                <div className='center versus'>
                    <h1>VS</h1>
                </div>
                <div className='p1-intro end '>
                    <h2>{user?.username}</h2>
                    <img
                        src={user?.image}
                        style={{ background: user?.color }}
                        alt='p1 image'
                    />
                </div>
            </div>
        </ModalOverlay>
    )
}

export default BattleIntro
