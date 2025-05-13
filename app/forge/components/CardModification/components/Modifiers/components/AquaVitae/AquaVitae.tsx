import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import { VscDebugRestart } from '@react-icons/all-files/vsc/VscDebugRestart'
import React, { useState } from 'react'

import { Card } from '@components'
import { CardValues, ICard } from '@interfaces'

interface AquaVitae {
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
	selectedCard: ICard | null
	selectedCardValues: Array<number | string>
	setSelectedCardValues: React.Dispatch<React.SetStateAction<Array<number>>>
}

const AquaVitae = ({
	selectedCard,
	selectedCardValues,
	setSelectedCardValues,
	setModificationInProgress
}: AquaVitae) => {
	const [modValues, setModValues] = useState<Array<number>>([])
	const [chosenValue, setChosenValue] = useState<number | null>(null)

	const updatedCardValues = [...selectedCardValues]
	const updatedModValues = [...modValues]

	const cardValueClick = (value: number | string, i: number) => {
		if (value !== '') {
			chooseValue(value as number)
			removeValue(i)
		} else if (chosenValue !== null) {
			placeValue(chosenValue, i)
			setChosenValue(null)
		}
	}

	const chooseValue = (value: number) => {
		if (modValues?.length < 2) {
			updatedModValues.push(value)
			setModValues(updatedModValues)
		}
	}

	const removeValue = (i: number) => {
		updatedCardValues[i] = ''
		setSelectedCardValues(updatedCardValues as CardValues)
	}

	const placeValue = (value: number, i: number) => {
		updatedCardValues[i] = value
		setSelectedCardValues(updatedCardValues as CardValues)
		removeModValue(value)
	}

	const modValueClick = (e: React.MouseEvent<HTMLDivElement>, value: number) => {
		const target = e.target as Element
		if (chosenValue === null) {
			target.classList.add('selected')
			setChosenValue(value as number)
		} else {
			target.classList.remove('selected')
			setChosenValue(null)
		}
	}

	const removeModValue = (value: number) => {
		const modValueIndex = updatedModValues.indexOf(value)
		if (modValueIndex !== -1) {
			updatedModValues.splice(modValueIndex, 1)
			setModValues(updatedModValues)
		}
	}

	const reset = () => {
		setModValues([])
		setChosenValue(null)
		setSelectedCardValues(selectedCard!.values)
	}

	return (
		<div className="vitae center fill">
			<div className="start-column">
				<div className="mod-bar center">
					{modValues?.map((value, i) => (
						<div
							key={value + i * 10}
							className="value box center"
							onClick={(e) => modValueClick(e, value)}
						>
							{value}
						</div>
					))}
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
							key={(value as number) + i * 10}
							className={`value-${i} box center ${modValues?.length > 1 && value !== '' && 'disabled'}`}
							onClick={() => cardValueClick(value, i)}
						>
							{value}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AquaVitae
