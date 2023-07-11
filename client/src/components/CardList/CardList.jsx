import React from 'react'

import { Card } from '@components'

import { CheckBox } from './components'
import './CardList.scss'

const CardList = ({ cardArray, handleClick, hasCheckbox }) => {
    return (
        <div className='card-list'>
            {cardArray?.map((card) => (
                <div key={card._id} className='card-container'>
                    <Card
                        card={card}
                        handleClick={(e) => handleClick(e, card)}
                        isShowing
                    />
                    {hasCheckbox && <CheckBox card={card} />}
                </div>
            ))}
        </div>
    )
}

export default CardList
