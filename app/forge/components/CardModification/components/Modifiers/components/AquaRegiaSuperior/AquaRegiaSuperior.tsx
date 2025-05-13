import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import { VscDebugRestart } from '@react-icons/all-files/vsc/VscDebugRestart'
import React from 'react'

import { Button, Card } from '@components'
import { ICard } from '@interfaces'

interface AquaRegiaSuperior {
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
	selectedCard: ICard | null
	selectedCardValues: Array<number>
	setSelectedCardValues: React.Dispatch<React.SetStateAction<Array<number>>>
}

const AquaRegiaSuperior = ({
	selectedCard,
	selectedCardValues,
	setSelectedCardValues,
	setModificationInProgress
}: AquaRegiaSuperior) => {
	const updatedCardValues = [...selectedCardValues]

	const rotateValues = () => {
		updatedCardValues.unshift(updatedCardValues.pop() as number)
		setSelectedCardValues(updatedCardValues)
	}

	const reset = () => {
		setSelectedCardValues(selectedCard!.values)
	}

	return (
		<div className="regia center fill">
			<div className="start-column">
				<div className="mod-bar center">
					<Button
						label="Rotate Values"
						onClick={() => rotateValues()}
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

export default AquaRegiaSuperior
