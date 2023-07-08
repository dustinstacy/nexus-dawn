import React from 'react'

import { Button, Filter } from '@components'

import { modificationOptions } from './constants'
import './ModificationSelector.scss'

const ModificationSelector = ({
    selectedModification,
    setModificationInProgress,
    setSelectedModification,
}) => {
    return (
        <div>
            <div className='box'>
                <Filter
                    label='Select Desired Modification'
                    value={selectedModification}
                    setValue={setSelectedModification}
                    options={modificationOptions}
                />
            </div>
            <Button
                label='Modify Card'
                onClick={() => setModificationInProgress(true)}
                disabled={
                    selectedModification === null ||
                    selectedModification === '-'
                }
            />
        </div>
    )
}

export default ModificationSelector
