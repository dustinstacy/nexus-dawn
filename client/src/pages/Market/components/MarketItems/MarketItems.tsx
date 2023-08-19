import React, { useEffect } from 'react'

import { useGlobalContext } from '@context'

import { Item } from './components'
import './MarketItems.scss'
import { IItem, User } from 'src/global.interfaces'

interface MarketItems {
    chosenItem: IItem | null
    setChosenItem: React.Dispatch<React.SetStateAction<IItem | null>>
}

// Renders the market items section
// chosenItem: State used to track the currently chosen item
// setChosenItem: Function to update the chosen item state based on user selection
const MarketItems = ({ chosenItem, setChosenItem }: MarketItems) => {
    const { allItems, user } = useGlobalContext()
    const { level } = user as User

    // Fetches and sets market items, and sets the first item as the chosen item
    useEffect(() => {
        setChosenItem(allItems[0])
    }, [allItems])

    // Sort market items by level
    const filteredItems = allItems.sort((a, b) => a.level - b.level)

    return (
        <div className='items'>
            {filteredItems.map((item, index) =>
                item.level > level ? (
                    <div key={item.name} className='locked-item center'>
                        <span>Unlocks at</span> level {item.level}
                    </div>
                ) : (
                    <Item
                        key={item.name}
                        item={item}
                        index={index}
                        chosenItem={chosenItem}
                        setChosenItem={setChosenItem}
                        allItems={allItems}
                    />
                )
            )}
        </div>
    )
}

export default MarketItems
