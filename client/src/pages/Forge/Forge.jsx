import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Card, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'

import './Forge.scss'

const Forge = () => {
    const { userCards } = useGlobalContext()

    const [cardSelectOpen, setCardSelectOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)

    const handleClick = (e, card) => {
        e.preventDefault()
        setSelectedCard(card)
        setCardSelectOpen(false)
    }

    return (
        <div className='forge page center'>
            <div className='panel card-select center'>
                {selectedCard ? (
                    <>
                        <AiOutlineCloseCircle
                            className='unselect-card'
                            onClick={() => setSelectedCard(null)}
                        />
                        <div className='selected-card center fill'>
                            <Card card={selectedCard} isShowing />
                        </div>
                    </>
                ) : (
                    <div
                        className='select-card fill center'
                        onClick={setCardSelectOpen}
                    >
                        <h1>+</h1>
                    </div>
                )}
            </div>
            {cardSelectOpen && (
                <ModalOverlay>
                    <div className='collection-display box start-column'>
                        <div className='card-list'>
                            {userCards?.map((card) => (
                                <div key={card._id} className='card-container'>
                                    <Card
                                        card={card}
                                        handleClick={(e) =>
                                            handleClick(e, card)
                                        }
                                        isShowing
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalOverlay>
            )}
        </div>
    )
}

export default Forge
