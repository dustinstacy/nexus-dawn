import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import { VscDebugRestart } from '@react-icons/all-files/vsc/VscDebugRestart'
import React from 'react'

import { Card } from '@components'
import { ICard } from '@interfaces'

interface AquaManna {
	selectedCard: ICard | null
	selectedCardValues: Array<number>
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const AquaManna = ({ selectedCard, selectedCardValues, setModificationInProgress }: AquaManna) => {
	const updatedCardValues = [...selectedCardValues]

	return (
		<div>
			<div className="start-column">
				<div className="mod-bar center"></div>
				<div className="mod-panel center">
					<AiOutlineCloseCircle
						className="cancel"
						onClick={() => setModificationInProgress(false)}
						data-cy="cancel"
					/>
					<VscDebugRestart
						className="reset"
						onClick={() => {}}
					/>
					<div className="selected-card center fill">
						<Card
							card={selectedCard!}
							isShowing
						/>
					</div>
					{updatedCardValues?.map((value, i) => (
						<div
							key={value + i * 10}
							className={`value-${i} box center `}
							data-cy={`value-${value}`}
						>
							{value}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AquaManna
