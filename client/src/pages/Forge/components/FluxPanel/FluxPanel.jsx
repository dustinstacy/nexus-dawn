import React from 'react'

import './FluxPanel.scss'

const FluxPanel = () => {
    const userFlux =
        user?.inventory.filter((item) => item?.type === 'flux') || []
    // Removing duplicates from userPacks and sorting them by level in descending order
    const uniqueFlux = uniqueItemsFilter(userFlux).sort(
        (a, b) => a.level - b.level
    )

    return (
        <div className='flux panel start-column'>
            {uniqueFlux.map((flux) => (
                <div className='forge-item center' key={flux.name}>
                    <img src={flux.image} alt={flux.name} />
                    <div className='count center'>
                        <p>x</p>
                        <p>
                            {
                                userFlux.filter(
                                    (item) => item.name === flux.name
                                ).length
                            }
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FluxPanel
