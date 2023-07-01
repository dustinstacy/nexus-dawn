import React, { useEffect, useState } from 'react'

import { Filter, Onboarding } from '@components'
import { useGlobalContext } from '@context'
import { calculateDeckPower } from '@utils'

import { CardCollection, DeckBar, UserPanel } from './components'
import {
    deckOptions,
    rarityOptions,
    valueOptions,
} from './constants/filterOptions'
import './Collection.scss'

// Renders user information, user's card collection with filter options, and deck management capabilities
const Collection = () => {
    const { getCurrentUser, user, userDeck } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const [deckFilter, setDeckFilter] = useState('')
    const [rarityFilter, setRarityFilter] = useState('')
    const [valueFilter, setValueFilter] = useState('Total')

    // Calculate sum of all card values in user's deck
    const userDeckPower = calculateDeckPower(userDeck)

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className='collection page'>
            {stage === 3 && <Onboarding />}
            <UserPanel />
            <DeckBar />
            <div className='header'>
                <h1>Cards</h1>
                <hr />
            </div>
            <div className='filters fill center'>
                <Filter
                    label='Cards Filter'
                    value={deckFilter}
                    setValue={setDeckFilter}
                    options={deckOptions}
                    id='deck-filter'
                />
                <Filter
                    label='Rarity Filter'
                    value={rarityFilter}
                    setValue={setRarityFilter}
                    options={rarityOptions}
                    id='rarity-filter'
                />
                <Filter
                    label='Value Filter'
                    value={valueFilter}
                    setValue={setValueFilter}
                    options={valueOptions}
                    selectedOption='Total'
                    id='value=filter'
                />
            </div>
            <CardCollection
                deckFilter={deckFilter}
                rarityFilter={rarityFilter}
                valueFilter={valueFilter}
            />
        </div>
    )
}

export default Collection
