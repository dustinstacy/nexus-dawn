import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { VscDebugRestart } from 'react-icons/vsc'

import { Button, Card } from '@components'
import { ICard } from '@interfaces'

interface AquaRegia {
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
	selectedCard: ICard | null
	selectedCardValues: Array<number>
	setSelectedCardValues: React.Dispatch<React.SetStateAction<Array<number>>>
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
					/>
				</div>
				<div className="mod-panel center">
					<AiOutlineCloseCircle
						className="cancel"
						onClick={() => setModificationInProgress(false)}
					/>
					<VscDebugRestart
						className="reset"
						onClick={() => reset()}
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
