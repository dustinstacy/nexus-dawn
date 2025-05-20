import React from 'react'

import { blueScore, redScore } from './images'

import './score.scss'
import Image from 'next/image'

const Score = ({ player }: any) => {
	const { name, roundScore } = player
	const playerScore = [...new Array(roundScore)]

	return (
		<div className={`${name}-score`}>
			{playerScore.map((count, i) => (
				<div
					key={'count' + i}
					className="center"
				>
					{name === 'p1' ?
						<Image
							className="center"
							src={blueScore.src}
							alt="blue score"
						/>
					:	<Image
							className="center"
							src={redScore.src}
							alt="red score"
						/>
					}
				</div>
			))}
		</div>
	)
}

export default Score
