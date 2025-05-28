import { IOpponent } from '@interfaces'
import stores from '@stores'
import utils from '@utils'

import './opponentCard.scss'

interface OpponentCardProps {
	opponent: IOpponent
	selectedOpponent: IOpponent | null
	setSelectedOpponent: (opponent: IOpponent) => void
}

// Renders a selectable opponent card with an image and name display.
const OpponentCard = ({ opponent, selectedOpponent, setSelectedOpponent }: OpponentCardProps) => {
	const user = stores.useUserStore((state) => state.user)
	const { avatar, level, name } = opponent

	const opponentClasses = utils.classSet(
		'opponent-card',
		'start-column',
		selectedOpponent === opponent ? 'selected' : ''
	)

	return (
		<>
			{user && user?.level >= opponent.level ?
				<div
					className={opponentClasses}
					onClick={() => setSelectedOpponent(opponent)}
					data-cy="opponent-card"
				>
					<img
						src={avatar}
						alt="opponent image"
						data-cy="opponent-image"
					/>
					<h3 data-cy="name">{name}</h3>
				</div>
			:	<div
					className="opponent-card locked center-column"
					data-cy="opponent-card"
				>
					<span>?</span>Level {level}
				</div>
			}
		</>
	)
}

export default OpponentCard
