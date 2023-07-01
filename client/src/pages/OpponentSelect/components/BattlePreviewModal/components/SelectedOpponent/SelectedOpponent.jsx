import React from 'react'

import { coinImage, headerStyle } from '@assets'
import { useGlobalContext } from '@context'

import './SelectedOpponent.scss'

// Renders selected opponent information
const SelectedOpponent = ({ selectedOpponent }) => {
    const { allItems } = useGlobalContext()
    const { name, image, minPower, maxPower, rewards, rounds } =
        selectedOpponent

    const roundsDisplay = ' Round' + (rounds > 1 ? 's' : '')

    const rewardItems = allItems.filter((item) =>
        rewards.items[0].name.includes(item.name)
    )

    return (
        <div className='selected-opponent fill'>
            <h1 className='opponent-name'>{name}</h1>
            <img
                className='opponent-image fill'
                src={image}
                alt='opponent image'
            />
            <div className='side-bar' />
            <div className='opponent-info start-column'>
                <div className='power-attribute between-column'>
                    <div className='header-wrapper center'>
                        <img
                            className='header-style'
                            src={headerStyle}
                            alt='header style'
                        />
                        POWER
                    </div>
                    <div className='value'>
                        <span>{(minPower + maxPower) / 2}</span>
                    </div>
                </div>
                <div className='rules-attribute between-column'>
                    <div className='header-wrapper center'>
                        <img
                            className='header-style'
                            src={headerStyle}
                            alt='header style'
                        />
                        Rules
                    </div>
                    <div className='value center-column'>
                        <span>{selectedOpponent.rules}</span>
                        <span>
                            {selectedOpponent.rounds}
                            {roundsDisplay}
                        </span>
                    </div>
                </div>
                <div className='rewards-attribute between-column'>
                    <div className='header-wrapper center'>
                        <img
                            className='header-style'
                            src={headerStyle}
                            alt='header style'
                        />
                        Drops
                    </div>
                    <div className='value around'>
                        {rewardItems?.map((item) => (
                            <img
                                key={item.name}
                                src={item.image}
                                alt='item image'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedOpponent
