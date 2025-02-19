import React from "react"

import { IOpponent } from "@interfaces"
import { useUserStore } from "@stores"
import { classSet } from "@utils"

import "./opponentCard.scss"

interface OpponentCardProps {
    opponent: IOpponent
    selectedOpponent: IOpponent | null
    setSelectedOpponent: (opponent: IOpponent) => void
}

// Renders a selectable opponent card with an image and name display.
const OpponentCard = ({ opponent, selectedOpponent, setSelectedOpponent }: OpponentCardProps) => {
    const user = useUserStore((state) => state.user)
    const { avatar, level, name } = opponent

    const opponentClasses = classSet("opponent-card", "start-column", selectedOpponent === opponent ? "selected" : "")

    return (
        <>
            {user && user?.level >= opponent.level ? (
                <div className={opponentClasses} onClick={() => setSelectedOpponent(opponent)}>
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
