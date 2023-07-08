import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Card, ModalOverlay } from '@components'

import { CardList } from './components'
import './CardSelector.scss'

const CardSelector = ({ selectedCard, setSelectedCard }) => {
    const [cardSelectOpen, setCardSelectOpen] = useState(false)

    const unselectCard = () => {
        setSelectedCard(null)
        setSelectedModification(null)
    }

    return (
        <div className='panel card-select center'>
            {selectedCard ? (
                <div className='selected-card center fill'>
                    <AiOutlineCloseCircle
                        className='unselect-card'
                        onClick={() => unselectCard()}
                    />

                    <Card card={selectedCard} isShowing />

                    {selectedCard?.values.map((value, i) => (
                        <p key={value + i * 10} className={`value-${i} center`}>
                            {value}
                        </p>
                    ))}
                </div>
            ) : (
                <div
                    className='select-card fill center'
                    onClick={setCardSelectOpen}
                >
                    <h1>+</h1>
                </div>
            )}

            {cardSelectOpen && (
                <ModalOverlay>
                    <CardList
                        setSelectedCard={setSelectedCard}
                        setCardSelectOpen={setCardSelectOpen}
                    />
                </ModalOverlay>
            )}
        </div>
    )
}

export default CardSelector
