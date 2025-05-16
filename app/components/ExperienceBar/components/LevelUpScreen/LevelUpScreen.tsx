import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import { useEffect, useState } from 'react'

import { coinImage } from '@assets'
import { User } from '@interfaces'
import stores from '@stores'

import './levelUpScreen.scss'

interface LevelUpScreenProps {
	setNewLevelAlert: (state: boolean) => void
}

const LevelUpScreen = ({ setNewLevelAlert }: LevelUpScreenProps) => {
	const { useItemsStore, useOpponentsStore, useUserStore } = stores
	const { user } = useUserStore()
	const { allItems } = useItemsStore()
	const { allOpponents } = useOpponentsStore()
	const { level } = user as User
	const [animationFinished, setAnimationFinished] = useState(false)

	const sortedItems = allItems.sort((a, b) => a.level - b.level)

	useEffect(() => {
		setTimeout(() => {
			setAnimationFinished(true)
		}, 5000)
	})

	return (
		<div
			className="level-up fill start-column"
			data-cy="level-up"
		>
			<h1>Level Up</h1>
			{animationFinished && (
				<AiOutlineCloseCircle
					className="close-modal"
					onClick={() => {
						setNewLevelAlert(false)
					}}
					data-cy="close-modal"
				/>
			)}
			<div className="level-wrapper center">
				<div className="new-level-border center">
					<div
						className="prev-level abs-center"
						data-cy="prev-level"
					>
						{level - 1}
					</div>
					<div
						className="new-level abs-center"
						data-cy="new-level"
					>
						{level}
					</div>
				</div>
				<hr className="wrapper-hr" />
			</div>
			<div
				className="level-up-unlocks around"
				data-cy="level-up-unlocks"
			>
				{level < 10 && (
					<>
						<div
							className="unlock start-column panel background-gradient"
							data-cy="market-item-unlock"
						>
							<h2 data-cy="market-item-title">
								New Market <br />
								Item Available
							</h2>
							<img
								src={sortedItems[level - 1]?.image}
								alt="market item"
								data-cy="market-item-image"
							/>
							<p>{sortedItems[level - 1]?.name}</p>
						</div>
						<div
							className="unlock start-column panel background-gradient"
							data-cy="opponent-unlock"
						>
							<h2 data-cy="opponent-title">
								New Opponent <br />
								Unlocked
							</h2>
							<img
								src={allOpponents[level - 1]?.image}
								alt="unlocked opponent"
								data-cy="opponent-image"
							/>
							<p>{allOpponents[level - 1]?.name}</p>
						</div>
					</>
				)}
				<div className="unlock start-column panel background-gradient">
					<h2>
						Level <br /> Rewards
					</h2>
					<div className="coin-reward center">
						<span data-cy="coin-reward-amount">{level * 1.5 * 100}</span>
						<img
							src={coinImage.src}
							alt="coin-image"
							data-cy="coin-reward-image"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LevelUpScreen
