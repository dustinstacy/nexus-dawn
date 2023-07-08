import React from 'react'

import './AquaPanel.scss'

const AquaPanel = () => {
    const userModifiers =
        user?.inventory.filter((item) => item?.type === 'modifier') || []
    // Removing duplicates from userPacks and sorting them by level in descending order
    const uniqueModifiers = uniqueItemsFilter(userModifiers).sort(
        (a, b) => a.level - b.level
    )

    return (
        <div className='aquas panel start-column'>
            {uniqueModifiers?.map((modifier) => (
                <div className='forge-item center' key={modifier?.name}>
                    <img src={modifier?.image} alt={modifier?.name} />
                    <div className='count center'>
                        <p>x</p>
                        <p>
                            {
                                userModifiers.filter(
                                    (item) => item.name === modifier.name
                                ).length
                            }
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AquaPanel
