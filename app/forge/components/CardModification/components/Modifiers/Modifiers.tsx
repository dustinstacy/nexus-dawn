import React, { useEffect, useState } from 'react'

import { ICard, IItem } from '@interfaces'
import { useItemsStore } from '@stores'
import { updateState } from '@utils'

import {
	AquaFortis,
	AquaFortisSuperior,
	AquaManna,
	AquaRegia,
	AquaRegiaSuperior,
	AquaVitae,
	AquaVitaeSuperior,
	CostDisplay
} from './components'
import { modificationOptions } from './constants'
import './modifiers.scss'

interface Modifiers {
	selectedCard: ICard | null
	setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
	selectedModification: string
	setModificationComplete: React.Dispatch<React.SetStateAction<boolean>>
	setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

interface ModCost {
	aquaType: IItem | null
	aquaAmount: number
	fluxType: IItem | null
	fluxAmount: number
}

type ComponentMap = {
	[key: string]: React.ComponentType<any>
}

const Modifiers = ({
	selectedCard,
	setSelectedCard,
	selectedModification,
	setModificationComplete,
	setModificationInProgress
}: Modifiers) => {
	const allItems = useItemsStore((state) => state.allItems)

	const [selectedCardValues, setSelectedCardValues] = useState([...selectedCard!.values])
	const [modCost, setModCost] = useState<ModCost>({
		aquaType: null,
		aquaAmount: 1,
		fluxType: null,
		fluxAmount: 1
	})

	const modifiers = [...modificationOptions].slice(1)
	const componentMap: ComponentMap = {
		AquaVitae,
		AquaRegia,
		AquaFortis,
		AquaVitaeSuperior,
		AquaRegiaSuperior,
		AquaFortisSuperior,
		AquaManna
	}

	useEffect(() => {
		const setAquaType = () => {
			const aquaItem = allItems.find((item) => item.name === selectedModification)
			updateState(setModCost, { aquaType: aquaItem })
		}

		const setFluxType = () => {
			const fluxItem = allItems.find(
				(item) => item.name.includes(selectedCard!.rarity) && item.type === 'flux'
			)
			updateState(setModCost, { fluxType: fluxItem })
		}

		setAquaType()
		setFluxType()
		// eslint-disable-next-line react-hooks/exhaustive-deps -- only run once
	}, [])

	return (
		<div className="modifier">
			{modifiers.map((modifier) => {
				const Component = componentMap[modifier.replace(/\s/g, '')]
				return (
					selectedModification === `${modifier}` && (
						<Component
							key={modifier}
							selectedCard={selectedCard}
							selectedCardValues={selectedCardValues}
							setSelectedCardValues={setSelectedCardValues}
							setModificationInProgress={setModificationInProgress}
						/>
					)
				)
			})}
			<CostDisplay
				modCost={modCost}
				setModificationComplete={setModificationComplete}
				selectedCard={selectedCard}
				setSelectedCard={setSelectedCard}
				selectedCardValues={selectedCardValues}
			/>
		</div>
	)
}

export default Modifiers
