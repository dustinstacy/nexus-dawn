import React from 'react'

import { ExperienceBar } from '@components'

import './XPReward.scss'

// Renders the user's xp reward and their experience bar
const XPReward = ({ xpReward }) => {
    return (
        <div className='results-xp center-column'>
            <div className='xp-wrapper center'>
                <div className='gained-xp center'>
                    <span>+{Math.floor(xpReward)}</span>
                    <span>XP</span>
                </div>
            </div>
            <ExperienceBar />
        </div>
    )
}

export default XPReward
