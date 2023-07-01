import React from 'react'
import { blueScore, redScore } from './images'

import './Score.scss'

const Score = ({ player }) => {
    const { name, roundScore } = player
    const playerScore = [...new Array(roundScore)]

    return (
        <div className={`${name}-score`}>
            {playerScore.map((count, i) => (
                <div key={'count' + i} className='center'>
                    {name === 'p1' ? (
                        <img
                            className='center'
                            src={blueScore}
                            alt='blue score'
                        />
                    ) : (
                        <img
                            className='center'
                            src={redScore}
                            alt='red score'
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Score
