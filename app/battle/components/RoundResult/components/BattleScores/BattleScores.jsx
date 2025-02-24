import React from 'react'

import './BattleScores.scss'

const BattleScores = ({ playerOne, playerTwo }) => {
    return (
        <div className='battle-scores between'>
            <div className='p2-battle-score'>
                <span>{playerTwo.battleScore}</span>
            </div>
            <div className='total panel'>
                <h4>Total</h4>
            </div>
            <div className='p1-battle-score'>
                <span>{playerOne.battleScore}</span>
            </div>
        </div>
    )
}

export default BattleScores
