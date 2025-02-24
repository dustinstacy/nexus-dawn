import React, { useEffect, useState } from "react"

import { coinImage } from "@assets"
import { useUserStore } from "@stores"

import "./coinReward.scss"

interface CoinRewardProps {
    coinReward: number
}

// Renders user's coin reward
const CoinReward = ({ coinReward }: CoinRewardProps) => {
    const user = useUserStore((state) => state.user)
    const [displayCoin, setDisplayCoin] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)

    // Animate the displayed coin to increment to the reward total
    useEffect(() => {
        if (!hasAnimated) {
            const startAnimation = () => {
                const startTime = Date.now()
                const duration = 1000
                const targetCoin = Math.floor(coinReward)

                const animateCoin = () => {
                    const currentTime = Date.now()
                    const elapsed = currentTime - startTime
                    const progress = Math.min(elapsed / duration, 1)
                    const updatedCoin = Math.round(displayCoin + (targetCoin - displayCoin) * progress)

                    setDisplayCoin(updatedCoin)

                    if (progress < 1) {
                        requestAnimationFrame(animateCoin)
                    }
                }

                requestAnimationFrame(animateCoin)
            }

            setHasAnimated(true)
            // Delay animation by 2 1/2 seconds
            setTimeout(() => startAnimation(), 2500)
        }
    }, [user?.coin])

    return (
        <div className='results-coin center'>
            <p>+{displayCoin}</p>
            <img src={coinImage.src} alt='coin image' />
        </div>
    )
}

export default CoinReward
