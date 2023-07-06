import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Card, Filter, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { uniqueItemsFilter, updateState } from '@utils'

import { modificationOptions } from './constants'
import './Forge.scss'

const Forge = () => {
    const { allItems, user, userCards } = useGlobalContext()

    const [cardSelectOpen, setCardSelectOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedModification, setSelectedModification] = useState(null)
    const [modificationCost, setModificationCost] = useState({
        fluxType: '',
        fluxQuantity: 0,
        AquaType: '',
        AquaQuantity: 1,
    })

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

    const selectCard = (e, card) => {
        e.preventDefault()
        setSelectedCard(card)
        setCardSelectOpen(false)
    }

    const unselectCard = () => {
        setSelectedCard(null)
        setSelectedModification(null)
    }

    const calculateFluxCost = () => {
        const requiredFlux = allItems.find((item) =>
            item.name.includes(`${selectedCard?.rarity} Flux`)
        )
        const requiredQuantity = (selectedCard?.level || 1) * 1
        updateState(setModificationCost, {
            fluxType: requiredFlux,
            fluxQuantity: requiredQuantity,
        })
    }

    useEffect(() => {
        calculateFluxCost()
    }, [selectedCard])

    useEffect(() => {
        if (selectedModification === '-') {
            setSelectedModification(null)
        } else {
            const requiredAqua = allItems.find((item) =>
                item.name.includes(selectedModification)
            )
            updateState(setModificationCost, { AquaType: requiredAqua })
        }
    }, [selectedModification])

    return (
        <div className='forge page around'>
            <div className='modifiers panel start-column'>
                {uniqueModifiers.map((modifier) => (
                    <div className='forge-item center' key={modifier.name}>
                        <img src={modifier.image} alt={modifier.name} />
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
            {selectedCard ? (
                <div className='center-column'>
                    <div className='panel card-select center'>
                        {' '}
                        <AiOutlineCloseCircle
                            className='unselect-card'
                            onClick={() => unselectCard()}
                        />
                        <div className='selected-card center fill'>
                            <Card card={selectedCard} isShowing />
                        </div>
                    </div>
                    <div className='box'>
                        <Filter
                            label='Select Desired Modification'
                            value={selectedModification}
                            setValue={setSelectedModification}
                            options={modificationOptions}
                        />
                        {selectedModification &&
                            modificationCost?.AquaType.info}
                    </div>
                    {selectedModification && (
                        <div className='mod-cost panel center'>
                            <img
                                src={modificationCost.fluxType.image}
                                alt='required flux type'
                            />
                            <p>x {modificationCost.fluxQuantity}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className='panel card-select center'>
                    <div
                        className='select-card fill center'
                        onClick={setCardSelectOpen}
                    >
                        <h1>+</h1>
                    </div>
                </div>
            )}

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
            {cardSelectOpen && (
                <ModalOverlay>
                    <div className='collection-display box start-column'>
                        <div className='card-list'>
                            {userCards?.map((card) => (
                                <div key={card._id} className='card-container'>
                                    <Card
                                        card={card}
                                        handleClick={(e) => selectCard(e, card)}
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
