import React from "react"
import { blueScore, redScore } from "./images"

import "./score.scss"

const Score = ({ player }: any) => {
    const { name, roundScore } = player
    const playerScore = [...new Array(roundScore)]

    return (
        <div className={`${name}-score`}>
            {playerScore.map((count, i) => (
                <div key={"count" + i} className='center'>
                    {name === "p1" ? (
                        <img className='center' src={blueScore.src} alt='blue score' />
                    ) : (
                        <img className='center' src={redScore.src} alt='red score' />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Score
