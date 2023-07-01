import React from 'react'

import { useGlobalContext } from '@context'
import { classSet } from '@utils'

import './OpponentCard.scss'

// Renders a selectable opponent card with an image and name display.
const OpponentCard = ({ opponent, selectedOpponent, setSelectedOpponent }) => {
    const { user } = useGlobalContext()
    const { avatar, level, name } = opponent

    const opponentClasses = classSet(
        'opponent-card',
        'start-column',
        selectedOpponent === opponent && 'selected'
    )

    return (
        <>
            {user?.level >= opponent.level ? (
                <div
                    className={opponentClasses}
                    onClick={() => setSelectedOpponent(opponent)}
                >
                    <img src={avatar} alt='opponent image' />
                    <h3>{name}</h3>
                </div>
            ) : (
                <div className='opponent-card locked center-column'>
                    <span>?</span>Level {level}
                </div>
            )}
        </>
    )
}

export default OpponentCard
