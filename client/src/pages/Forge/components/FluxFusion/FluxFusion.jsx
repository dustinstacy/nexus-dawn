import React from 'react'
import { TbArrowBigRightLines } from 'react-icons/tb'

import { addItemToInventory, removeItemFromInventory } from '@api'
import { Button } from '@components'
import { useGlobalContext } from '@context'

import './FluxFusion.scss'

const FluxFusion = ({ setFluxFusion }) => {
    const { allItems, getCurrentUser, user } = useGlobalContext()

    const allFlux = allItems.filter((item) => item.type === 'flux')

    const startingFlux = [...allFlux]
    const fusedFlux = [...allFlux]
    startingFlux.pop()
    fusedFlux.shift()

    const fuseFlux = async (startingFlux, fusedFlux) => {
        const removeItemPromises = []

        for (let i = 0; i < 10; i++) {
            removeItemPromises.push(removeItemFromInventory(user, startingFlux))
        }
        await Promise.all(removeItemPromises)
        await addItemToInventory(user, fusedFlux)
        await getCurrentUser()
    }

    return (
        <div className='start-column'>
            <div className='fusion-panel around-column'>
                {startingFlux.map((starting, index) => (
                    <div className='flux-row around'>
                        <div className='current flux center'>
                            <img src={starting?.image} alt={starting?.name} />
                            <div
                                className={`count center ${
                                    user?.inventory.filter(
                                        (item) => item.name === starting.name
                                    ).length < 10 && 'insufficient'
                                }`}
                            >
                                <p>X</p>
                                <span>
                                    {
                                        user?.inventory.filter(
                                            (item) =>
                                                item.name === starting.name
                                        ).length
                                    }
                                </span>
                            </div>
                        </div>
                        <TbArrowBigRightLines
                            className={`flux-arrow ${
                                user?.inventory.filter(
                                    (item) => item.name === starting.name
                                ).length < 10 && 'disabled'
                            }`}
                            onClick={() => fuseFlux(starting, fusedFlux[index])}
                        />
                        <div className='fused flux center'>
                            <img
                                src={fusedFlux[index]?.image}
                                alt={fusedFlux[index]?.name}
                            />
                            <div className='count center'>
                                <p>X</p>
                                <span>
                                    {
                                        user?.inventory.filter(
                                            (item) =>
                                                item.name ===
                                                fusedFlux[index].name
                                        ).length
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Button label='Exit' onClick={() => setFluxFusion(false)} />
        </div>
    )
}

export default FluxFusion
