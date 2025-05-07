import { headerStyle } from '@assets'
import { IOpponent } from '@interfaces'
import { useItemsStore } from '@stores'

import './selectedOpponent.scss'
import Image from 'next/image'

interface SelectedOpponentProps {
	selectedOpponent: IOpponent
}

// Renders selected opponent information
const SelectedOpponent = ({ selectedOpponent }: SelectedOpponentProps) => {
	const allItems = useItemsStore((state) => state.allItems)
	const { name, image, minPower, maxPower, rewards, rounds } = selectedOpponent

	const roundsDisplay = ' Round' + (rounds > 1 ? 's' : '')

	const rewardItems = allItems.filter((item) => rewards.items[0].name.includes(item.name))

	return (
		<div className="selected-opponent fill">
			<h1 className="opponent-name">{name}</h1>
			<Image
				className="opponent-image fill"
				src={image}
				alt="opponent image"
			/>
			<div className="side-bar" />
			<div className="opponent-info start-column">
				<div className="power-attribute between-column">
					<div className="header-wrapper center">
						<Image
							className="header-style"
							src={headerStyle.src}
							alt="header style"
						/>
						POWER
					</div>
					<div className="value">
						<span>{(minPower + maxPower) / 2}</span>
					</div>
				</div>
				<div className="rules-attribute between-column">
					<div className="header-wrapper center">
						<Image
							className="header-style"
							src={headerStyle.src}
							alt="header style"
						/>
						Rules
					</div>
					<div className="value center-column">
						<span>{selectedOpponent.rules}</span>
						<span>
							{selectedOpponent.rounds}
							{roundsDisplay}
						</span>
					</div>
				</div>
				<div className="rewards-attribute between-column">
					<div className="header-wrapper center">
						<Image
							className="header-style"
							src={headerStyle.src}
							alt="header style"
						/>
						Drops
					</div>
					<div className="value around">
						{rewardItems?.map((item) => (
							<Image
								key={item.name}
								src={item.image}
								alt="item image"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SelectedOpponent
