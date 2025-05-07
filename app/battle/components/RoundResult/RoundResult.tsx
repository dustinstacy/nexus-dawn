import React from 'react'

import { BattleData } from '@interfaces'

import { BattleScores, RoundScores } from './components'
import './roundResult.scss'
import Image from 'next/image'

// Renders all of the round scores as well as the cumulative battle score for each player
const RoundResult = ({ playerOne, playerTwo, battleState }: BattleData) => {
	const { roundResults } = battleState

	return (
		<div className="round-result fill around">
			<div className="round-player start-column">
				<h4>{playerTwo.user?.name}</h4>
				<Image 
					src={playerTwo.user?.avatar}
					alt="p2 image"
				/>
			</div>

			<div className="score-wrapper start-column">
				<h1>Round</h1>
				<div className="round-scores start-column">
					{roundResults.map((round) => (
						<RoundScores
							key={round.round}
							p1Score={round.p1Score}
							p2Score={round.p2Score}
							round={round.round}
						/>
					))}
				</div>
				<BattleScores
					playerOne={playerOne}
					playerTwo={playerTwo}
				/>
			</div>

			<div className="round-player start-column">
				<h4>{playerOne.user?.username}</h4>
				<Image
					src={playerOne.user?.image}
					alt="p1 image"
				/>
			</div>
		</div>
	)
}

export default RoundResult
