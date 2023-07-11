import React from 'react'

import { Filter } from '@components'
import { useGlobalContext } from '@context'
import { uniqueItemsFilter } from '@utils'

import './ModificationSelector.scss'

const ModificationSelector = ({
    selectedModification,
    setSelectedModification,
}) => {
    const { allItems, user } = useGlobalContext()

    const userModifiers = user?.inventory.filter(
        (item) => item.type === 'modifier'
    )
    const uniqueUserModifiers = uniqueItemsFilter(userModifiers)
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
