import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import { VscDebugRestart } from '@react-icons/all-files/vsc/VscDebugRestart'
import React, { useEffect, useState } from 'react'

import { Card } from '@components'
import { CardValues, ICard } from '@interfaces'

interface AquaVitaeSuperior {
	selectedCard: ICard | null
	selectedCardValues: Array<number | string>
	setSelectedCardValues: React.Dispatch<React.SetStateAction<Array<number>>>
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const AquaVitaeSuperior = ({
	selectedCard,
	selectedCardValues,
	setSelectedCardValues,
	setModificationInProgress
}: AquaVitaeSuperior) => {
	const [modValues, setModValues] = useState<Array<number | string>>([...selectedCardValues])
	const [chosenValue, setChosenValue] = useState<number | null>(null)

	const updatedCardValues = [...selectedCardValues]
	const updatedModValues = [...modValues]

	useEffect(() => {
		setSelectedCardValues(Array(4).fill(''))
	}, [])

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
		removeSelectedClass()
	}

	const modValueClick = (e: React.MouseEvent<HTMLDivElement>, value: number) => {
		const target = e.target as Element
		if (chosenValue === null) {
			target.classList.add('selected')
			setChosenValue(value)
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

	const removeSelectedClass = () => {
		const selectedValue = document.querySelector('.selected')
		selectedValue?.classList.remove('selected')
	}

	const reset = () => {
		setModValues([...selectedCard!.values])
		setChosenValue(null)
		setSelectedCardValues(Array(4).fill(''))
	}

	return (
		<div className="vitae center fill">
			<div className="start-column">
				<div className="mod-bar center">
					{modValues?.map((value, i) => (
						<div
							key={(value as number) + i * 10}
							className="value box center"
							onClick={(e) => modValueClick(e, value as number)}
							data-cy={`mod-value-${value}`}
						>
							{value}
						</div>
					))}
				</div>
				<div className="mod-panel center">
					<AiOutlineCloseCircle
						className="cancel"
						onClick={() => setModificationInProgress(false)}
						data-cy="cancel-icon"
					/>
					<VscDebugRestart
						className="reset"
						onClick={() => reset()}
						data-cy="reset-icon"
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
							className={`value-${i} box center ${value !== '' && 'disabled'}`}
							onClick={() => cardValueClick(value, i)}
							data-cy={`card-value-${value}`}
						>
							{value}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AquaVitaeSuperior
