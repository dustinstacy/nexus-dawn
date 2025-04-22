import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { VscDebugRestart } from 'react-icons/vsc'

import { Card } from '@components'
import { ICard } from '@interfaces'

interface AquaManna {
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
	selectedCard: ICard | null
	selectedCardValues: Array<number>
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
