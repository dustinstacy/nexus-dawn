import React from 'react'

import './UserPack.scss'

// Renders the details of a user pack within the carousel
const UserPack = ({ itemData, allItems }) => {
    const { contents, image, info, level, name } = itemData

    return (
        <div className='user-pack around'>
            {itemData && (
                <>
                    <div className='pack-image'>
                        <img src={image} alt={name} />
                    </div>
                    <div className='pack-info start-column'>
                        <h2 className='pack-name between'>{name}</h2>
                        <hr />
                        <div className='pack-details '>
                            <p>{info}</p>
                            <div className='pack-odds'>
                                <h4>Odds:</h4>
                                {contents?.odds &&
                                    Object.entries(contents?.odds).map(
                                        ([key, value]) => (
                                            <div key={key}>
                                                <p>
                                                    {key}: &nbsp;{value}%
                                                </p>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                        <div className='available-inventory'>
                            <span>Available: &nbsp;</span>
                            {
                                allItems.filter((item) => item.name === name)
                                    .length
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserPack
