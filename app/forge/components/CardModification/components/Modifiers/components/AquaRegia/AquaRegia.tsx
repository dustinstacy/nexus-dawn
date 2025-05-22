import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import { VscDebugRestart } from '@react-icons/all-files/vsc/VscDebugRestart'
import React, { useState } from 'react'

import { Button, Card } from '@components'
import { ICard } from '@interfaces'

interface AquaRegia {
	selectedCard: ICard | null
	selectedCardValues: Array<number>
	setSelectedCardValues: React.Dispatch<React.SetStateAction<Array<number>>>
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const AquaRegia = ({
	selectedCard,
	selectedCardValues,
	setSelectedCardValues,
	setModificationInProgress
}: AquaRegia) => {
	const [rotated, setRotated] = useState(false)
	const updatedCardValues = [...selectedCardValues]

	const rotateValues = () => {
		updatedCardValues.unshift(updatedCardValues.pop() as number)

		setSelectedCardValues(updatedCardValues)
		setRotated(true)
	}

	const reset = () => {
		setSelectedCardValues(selectedCard!.values)
		setRotated(false)
	}

	return (
		<div className="regia center fill">
			<div className="start-column">
				<div className="mod-bar center">
					<Button
						label="Rotate Values"
						onClick={() => rotateValues()}
						disabled={rotated}
						dataCy="rotate-button"
					/>
				</div>
				<div className="mod-panel center">
					<AiOutlineCloseCircle
						className="cancel"
						onClick={() => setModificationInProgress(false)}
						data-cy="cancel-button"
					/>
					<VscDebugRestart
						className="reset"
						onClick={() => reset()}
						data-cy="reset-button"
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

export default AquaRegia
