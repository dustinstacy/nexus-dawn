import { useEffect, useState } from 'react'

import { coinImage } from '@assets'

import './coinReward.scss'

interface CoinRewardProps {
	coinReward: number
}

// Renders user's coin reward
const CoinReward = ({ coinReward }: CoinRewardProps) => {
	const [displayCoin, setDisplayCoin] = useState(0)

	// Animate the displayed coin to increment to the reward total
	useEffect(() => {
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

		setTimeout(() => startAnimation(), 2500)
		//eslint-disable-next-line react-hooks/exhaustive-deps -- only run once
	}, [])

	return (
		<div className="results-coin center">
			<p>+{displayCoin}</p>
			<img
				src={coinImage.src}
				alt="coin image"
			/>
		</div>
	)
}

export default CoinReward
