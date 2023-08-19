import { Filter } from '@components'
import { useGlobalContext } from '@context'
import { uniqueItemsFilter } from '@utils'
import { IItem } from 'src/global.interfaces'

import './ModificationSelector.scss'

interface ModificationSelector {
    selectedModification: string
    setSelectedModification: React.Dispatch<React.SetStateAction<string>>
}

const ModificationSelector = ({
    selectedModification,
    setSelectedModification,
}: ModificationSelector) => {
    const { allItems, user } = useGlobalContext()

    const userModifiers = user?.inventory
        .filter((item) => item.type === 'modifier')
        .sort((a, b) => a.level - b.level)
    const uniqueUserModifiers = uniqueItemsFilter(userModifiers as Array<IItem>)
    const modificationOptions = [
        '-',
        ...uniqueUserModifiers.map((modifier) => modifier.name),
    ]

    const currentModificationItem = allItems.find(
        (item) => item.name === selectedModification
    )

    return (
        <div className='mod-select box'>
            <Filter
                id='selectMod'
                label='Select Modification'
                value={selectedModification}
                setValue={setSelectedModification}
                options={modificationOptions}
            />
            {currentModificationItem?.info}
        </div>
    )
}

export default ModificationSelector
