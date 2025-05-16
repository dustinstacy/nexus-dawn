import { useEffect, useState } from 'react'

import api from '@api'
import { IItem } from '@interfaces'
import stores from '@stores'

import './battleResults.scss'
import { BattleResultsButtons, CoinReward, XPReward } from './components'
import { resultsFrame } from './images'

interface BattleResultsProps {
	playerOne: any
	playerTwo: any
}

// Renders the user's battle results including any rewards gained
const BattleResults = ({ playerOne, playerTwo }: BattleResultsProps) => {
	const { addCoin, addExperience, addItemToInventory, updateUserStats } = api
	const { useItemsStore, useUserStore } = stores
	const fetchUserData = useUserStore((state) => state.fetchUserData)
	const allItems = useItemsStore((state) => state.allItems)

	const [battleResult, setBattleResult] = useState<string | null>(null)
	const [itemReward, setItemReward] = useState<IItem[] | null>(null)
	const [loading, setLoading] = useState(true)

	const user = playerOne.user
	const opponent = playerTwo.user

	const coinReward = Math.floor(
		opponent.rewards.coin * ((playerOne.battleScore - playerTwo.battleScore) / 2 + 1)
	)

	const xpReward = Math.floor(
		opponent.rewards.xp * ((playerOne.battleScore - playerTwo.battleScore) / 2 + 1)
	)

	useEffect(() => {
		setBattleResults()
	}, [])

	const setBattleResults = () => {
		if (playerOne.battleScore > playerTwo.battleScore) {
			handleResult('win')
			setBattleResult('Victory')
		} else if (playerOne.battleScore < playerTwo.battleScore) {
			handleResult('loss')
			setBattleResult('Defeat')
		} else if (playerOne.battleScore === playerTwo.battleScore) {
			handleResult('draw')
			setBattleResult('Draw')
		}
	}

	const handleResult = async (resultType: string) => {
		await fetchUserData('stats')
		await updateUserStats(user, resultType)
		const randomRewardChance = Math.random()

		if (resultType === 'win' && randomRewardChance < opponent.rewards.items[0].chance / 100) {
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
			fetchUserData('coin')
			setTimeout(async () => {
				await addExperience(user, xpReward)
				fetchUserData('xp')
			}, 1000)
			setTimeout(() => {
				setLoading(false)
			}, 4000)
		}
	}

	return (
		<div className="battle-over fill center">
			<img
				className="results-frame abs-center"
				src={resultsFrame.src}
				alt="results-frame"
			/>
			<div className="panel fill center-column">
				<div className="results-wrapper around-column">
					<span className="result">{battleResult}</span>
					<img
						className="user-image"
						src={user?.image}
						alt="user image"
					/>
					<div className="rewards around-column">
						{battleResult !== 'Defeat' && (
							<>
								<XPReward xpReward={xpReward} />
								<div className="rewards__bottom around">
									<CoinReward coinReward={coinReward} />
									{itemReward && (
										<div className="item-reward center">
											<p>+</p>
											<img
												src={itemReward[0].image}
												alt="item reward"
											/>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<BattleResultsButtons loading={loading} />
		</div>
	)
}

export default BattleResults
