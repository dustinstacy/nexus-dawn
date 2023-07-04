import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Card, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { uniqueItemsFilter } from '@utils'

import './Forge.scss'

const Forge = () => {
    const { user, userCards } = useGlobalContext()

    const [cardSelectOpen, setCardSelectOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)

    const userModifiers =
        user?.inventory.filter((item) => item?.type === 'modifier') || []
    // Removing duplicates from userPacks and sorting them by level in descending order
    const uniqueModifiers = uniqueItemsFilter(userModifiers).sort(
        (a, b) => a.level - b.level
    )

    const userFlux =
        user?.inventory.filter((item) => item?.type === 'flux') || []
    // Removing duplicates from userPacks and sorting them by level in descending order
    const uniqueFlux = uniqueItemsFilter(userFlux).sort(
        (a, b) => a.level - b.level
    )

    const handleClick = (e, card) => {
        e.preventDefault()
        setSelectedCard(card)
        setCardSelectOpen(false)
    }

    return (
        <div className='forge page around'>
            <div className='modifiers panel start-column'>
                {uniqueModifiers.map((modifier) => (
                    <div className='forge-item center'>
                        <img
                            key={modifier.name}
                            src={modifier.image}
                            alt={modifier.name}
                        />
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
            <div className='flux panel start-column'>
                {uniqueFlux.map((flux) => (
                    <div className='forge-item center'>
                        <img key={flux.name} src={flux.image} alt={flux.name} />
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
