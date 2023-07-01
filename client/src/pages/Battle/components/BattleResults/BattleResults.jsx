import React, { useEffect, useState } from 'react'

import {
    addCoin,
    addExperience,
    addItemToInventory,
    updateUserStats,
} from '@api'
import { useGlobalContext } from '@context'

import { BattleResultsButtons, CoinReward, XPReward } from './components'
import { resultsFrame } from './images'
import './BattleResults.scss'

// Renders the user's battle results including any rewards gained
const BattleResults = ({ playerOne, playerTwo, opponentDeck }) => {
    const { allItems, getCurrentUser } = useGlobalContext()

    const [battleResult, setBattleResult] = useState(null)
    const [itemReward, setItemReward] = useState(null)
    const [loading, setLoading] = useState(true)

    const user = playerOne.user
    const opponent = playerTwo.user

    const coinReward = Math.floor(
        opponent.rewards.coin *
            ((playerOne.battleScore - playerTwo.battleScore) / 2 + 1)
    )

    const xpReward = Math.floor(
        opponent.rewards.xp *
            ((playerOne.battleScore - playerTwo.battleScore) / 2 + 1)
    )

    useEffect(() => {
        setBattleResults()
    }, [])

    const setBattleResults = () => {
        if (playerOne.battleScore > playerTwo.battleScore) {
            setBattleResult('Victory')
            handleResult('win')
        } else if (playerOne.battleScore < playerTwo.battleScore) {
            setBattleResult('Defeat')
            handleResult('loss')
        } else if (playerOne.battleScore === playerTwo.battleScore) {
            setBattleResult('Draw')
            handleResult('draw')
        }
    }

    const handleResult = async (resultType) => {
        await updateUserStats(user, resultType)
        const randomRewardChance = Math.random()

        if (
            resultType === 'win' &&
            randomRewardChance < opponent.rewards.items[0].chance / 100
        ) {
            const rewardItem = allItems.filter((item) =>
                opponent.rewards.items[0].name.includes(item.name)
            )
            setTimeout(async () => {
                setItemReward(rewardItem)
                await addItemToInventory(user, rewardItem)
            }, 3500)
        }

        if (resultType === 'loss') {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            return
        } else {
            await addCoin(user, coinReward)
            setTimeout(async () => {
                await addExperience(user, xpReward)
                await getCurrentUser()
            }, 1000)
            setTimeout(() => {
                setLoading(false)
            }, 4000)
        }
    }

    return (
        <div className='battle-over fill center'>
            <img
                className='results-frame abs-center'
                src={resultsFrame}
                alt='results-frame'
            />
            <div className='panel fill center-column'>
                <div className='results-wrapper around-column'>
                    <span className='result'>{battleResult}</span>
                    <img
                        className='user-image'
                        src={user?.image}
                        alt='user image'
                    />
                    <div className='rewards around-column'>
                        {battleResult !== 'Defeat' && (
                            <>
                                <XPReward xpReward={xpReward} />
                                <div className='rewards__bottom around'>
                                    <CoinReward coinReward={coinReward} />
                                    {itemReward && (
                                        <div className='item-reward center'>
                                            <p>+</p>
                                            <img
                                                src={itemReward[0].image}
                                                alt='item reward'
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <BattleResultsButtons
                loading={loading}
                opponent={opponent}
                opponentDeck={opponentDeck}
            />
        </div>
    )
}

export default BattleResults
