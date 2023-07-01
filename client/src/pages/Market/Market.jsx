import React, { useState } from 'react'

import { Onboarding } from '@components'
import { useGlobalContext } from '@context'

import { ItemDisplay, MarketItems } from './components'
import './Market.scss'

// Represents the Market page component that displays the market menu, items, and item details.
const Market = () => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const [chosenItem, setChosenItem] = useState(null)

    return (
        <div className='market page'>
            {stage === 1 && <Onboarding />}
            <div className='market-menu-header'>
                <h1>MaRKet</h1>
                <hr />
            </div>
            <div className='market-menu'>
                <MarketItems
                    chosenItem={chosenItem}
                    setChosenItem={setChosenItem}
                />
                <ItemDisplay chosenItem={chosenItem} />
            </div>
        </div>
    )
}

export default Market
