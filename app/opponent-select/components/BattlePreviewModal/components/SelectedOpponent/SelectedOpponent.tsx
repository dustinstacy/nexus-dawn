import { headerStyle } from '@assets'
import { IOpponent } from '@interfaces'
import stores from '@stores'

import './selectedOpponent.scss'

interface SelectedOpponentProps {
	selectedOpponent: IOpponent
}

// Renders selected opponent information
const SelectedOpponent = ({ selectedOpponent }: SelectedOpponentProps) => {
	const allItems = stores.useItemsStore((state) => state.allItems)
	const { name, image, minPower, maxPower, rewards, rounds } = selectedOpponent
	const roundsDisplay = ' Round' + (rounds > 1 ? 's' : '')
	const rewardItems =
		rewards.items.length >= 1 ?
			allItems.filter((item) => rewards.items[0].name.includes(item.name))
		:	[]

	return (
		<div className="selected-opponent fill">
			<h1
				className="opponent-name"
				data-cy="opponent-name"
			>
				{name}
			</h1>
			<img
				className="opponent-image fill"
				src={image}
				alt="opponent image"
				data-cy="opponent-image"
			/>
			<div className="side-bar" />
			<div className="opponent-info start-column">
				<div
					className="power-attribute between-column"
					data-cy="power-attribute"
				>
					<div
						className="header-wrapper center"
						data-cy="power-attribute-header"
					>
						<img
							className="header-style"
							src={headerStyle.src}
							alt="header style"
							data-cy="power-attribute-header-style-image"
						/>
						POWER
					</div>
					<div
						className="value"
						data-cy="power-attribute-value"
					>
						<span>{(minPower + maxPower) / 2}</span>
					</div>
				</div>
				<div
					className="rules-attribute between-column"
					data-cy="rules-attribute"
				>
					<div
						className="header-wrapper center"
						data-cy="rules-attribute-header"
					>
						<img
							className="header-style"
							src={headerStyle.src}
							alt="header style"
							data-cy="rules-attribute-header-style-image"
						/>
						Rules
					</div>
					<div
						className="value center-column"
						data-cy="rules-attribute-value"
					>
						<span>{selectedOpponent.rules}</span>
						<span>
							{selectedOpponent.rounds}
							{roundsDisplay}
						</span>
					</div>
				</div>
				<div
					className="rewards-attribute between-column"
					data-cy="rewards-attribute"
				>
					<div
						className="header-wrapper center"
						data-cy="rewards-attribute-header"
					>
						<img
							className="header-style"
							src={headerStyle.src}
							alt="header style"
							data-cy="rewards-attribute-header-style-image"
						/>
						Drops
					</div>
					{rewardItems.length}
					<div className="value around">
						{rewardItems?.map((item) => (
							<img
								key={item.name}
								src={item.image}
								alt="item image"
								data-cy="reward-item-image"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SelectedOpponent
