import { Filter } from '@components'
import { IItem } from '@interfaces'
import stores from '@stores'
import { uniqueItemsFilter } from '@utils'

import './modificationSelector.scss'

interface ModificationSelector {
	selectedModification: string
	setSelectedModification: React.Dispatch<React.SetStateAction<string>>
}

const ModificationSelector = ({
	selectedModification,
	setSelectedModification
}: ModificationSelector) => {
	const user = stores.useUserStore((state) => state.user)
	const allItems = stores.useItemsStore((state) => state.allItems)

	const userModifiers = user?.inventory
		.filter((item) => item.type === 'modifier')
		.sort((a, b) => a.level - b.level)
	const uniqueUserModifiers = uniqueItemsFilter(userModifiers as Array<IItem>)
	const modificationOptions = ['-', ...uniqueUserModifiers.map((modifier) => modifier.name)]

	const currentModificationItem = allItems.find((item) => item.name === selectedModification)

	return (
		<div
			className="mod-select box"
			data-cy="modification-selector"
		>
			<Filter
				id="selectMod"
				label="Select Modification"
				value={selectedModification}
				setValue={setSelectedModification}
				options={modificationOptions}
			/>
			<span data-cy="modification-info">{currentModificationItem?.info}</span>
		</div>
	)
}

export default ModificationSelector
