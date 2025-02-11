import React from 'react'

import { useGlobalContext } from '@context'
import { classSet } from '@utils'

import './OpponentCard.scss'
import { IOpponent } from 'src/global.interfaces'

interface OpponentCardProps {
    opponent: IOpponent
    selectedOpponent: IOpponent | null
    setSelectedOpponent: React.Dispatch<React.SetStateAction<IOpponent | null>>
}

// Renders a selectable opponent card with an image and name display.
const OpponentCard = ({
    opponent,
    selectedOpponent,
    setSelectedOpponent,
}: OpponentCardProps) => {
    const { user } = useGlobalContext()
    const { avatar, level, name } = opponent

    const opponentClasses = classSet(
        'opponent-card',
        'start-column',
        selectedOpponent === opponent ? 'selected' : ''
    )

    return (
        <>
            {user && user?.level >= opponent.level ? (
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
