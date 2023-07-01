import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { coinImage } from '@assets'
import { useGlobalContext } from '@context'

import './LevelUpScreen.scss'

const LevelUpScreen = ({ setNewLevelAlert }) => {
    const { user, allItems, allOpponents } = useGlobalContext()
    const { level } = user
    const [animationFinished, setAnimationFinished] = useState(false)

    const sortedItems = allItems.sort((a, b) => a.level - b.level)

    useEffect(() => {
        setTimeout(() => {
            setAnimationFinished(true)
        }, 5000)
    })

    return (
        <div className='level-up fill start-column'>
            <h1>Level Up</h1>
            {animationFinished && (
                <AiOutlineCloseCircle
                    className='close-modal'
                    onClick={() => setNewLevelAlert(false)}
                />
            )}
            <div className='level-wrapper center'>
                <div className='new-level-border center'>
                    <div className='prev-level abs-center'>{level - 1}</div>
                    <div className='new-level abs-center'>{level}</div>
                </div>
                <hr className='wrapper-hr' />
            </div>
            <div className='level-up-unlocks around'>
                {level < 10 && (
                    <>
                        <div className='unlock start-column panel background-gradient'>
                            <h2>
                                New Market <br />
                                Item Available
                            </h2>
                            <img
                                src={sortedItems[level - 1]?.image}
                                alt='market item'
                            />
                            <p>{sortedItems[level - 1]?.name}</p>
                        </div>
                        <div className='unlock start-column panel background-gradient'>
                            <h2>
                                New Opponent <br /> Unlocked
                            </h2>
                            <img
                                src={allOpponents[level - 1]?.image}
                                alt='unlocked opponent'
                            />
                            <p>{allOpponents[level - 1]?.name}</p>
                        </div>
                    </>
                )}
                <div className=' unlock start-column panel background-gradient'>
                    <h2>
                        Level <br /> Rewards
                    </h2>
                    <div className='coin-reward center'>
                        <span>{user?.level * 1.5 * 100}</span>
                        <img src={coinImage} alt='coin-image' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LevelUpScreen
