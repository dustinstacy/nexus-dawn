import React from 'react'

import { useGlobalContext } from '@context'

import './ItemInformation.scss'

// chosenItem: Item currently chosen from market items
const ItemInformation = ({ chosenItem }) => {
    const { user } = useGlobalContext()
    const { image, info, contents, name } = chosenItem || {}

    return (
        <div className='item-info start'>
            <div className='item-image'>
                <img src={image} alt={name} />
                <div className='owned-inventory'>
                    <span>Owned: &nbsp;</span>
                    {
                        user?.inventory.filter((item) => item?.name === name)
                            .length
                    }
                </div>
            </div>
            <div className='item-details between-column'>
                <div className='section'>
                    <h2 className='item-name'>{name}</h2>
                    <hr />
                    <p className='item-desc'>{info}</p>
                </div>
                <div className='item-odds'>
                    <h4>Odds:</h4>
                    {contents?.odds &&
                        Object.entries(contents?.odds).map(([key, value]) => (
                            <div key={key}>
                                <p>
                                    {key}: &nbsp;{value} %
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ItemInformation
