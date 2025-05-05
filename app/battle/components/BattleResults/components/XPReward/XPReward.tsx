import React from 'react'

import { ExperienceBar } from '@components'

import './xpReward.scss'

interface XPRewardProps {
	xpReward: number
}

// Renders the user's xp reward and their experience bar
const XPReward = ({ xpReward }: XPRewardProps) => {
	return (
		<div className="results-xp center-column">
			<div className="xp-wrapper center">
				<div className="gained-xp center">
					<span>+{Math.floor(xpReward)}</span>
					<span>XP</span>
				</div>
			</div>
			<ExperienceBar />
		</div>
	)
}

export default XPReward
