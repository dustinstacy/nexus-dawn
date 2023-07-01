import React, { useEffect, useState } from 'react'

import { addCardToCollection, removeItemFromInventory } from '@api'
import { Button } from '@components'
import { useGlobalContext } from '@context'
import { createCardData, uniqueItemsFilter } from '@utils'
import { assignRandomCardValues, getRandomCards } from '@utils/randomizers'

import { Carousel, UserPack } from './components'
import './UserPacks.scss'

const UserPacks = ({ setIsLoading, setPackContents }) => {
    const { user, getGlobalState, getCurrentUser, allCards } =
        useGlobalContext()

    const [currentPack, setCurrentPack] = useState(null)

    const noPacksMessage = 'Head to the MaRKet to buy more packs'
    // Filtering user's inventory to get only packs and sorting them by level in descending order
    const userPacks =
        user?.inventory.filter((item) => item?.type === 'pack') || []
    // Removing duplicates from userPacks and sorting them by level in descending order
    const uniquePacks = uniqueItemsFilter(userPacks).sort(
        (a, b) => b.level - a.level
    )

    useEffect(() => {
        getGlobalState()
    }, [])

    const openCurrentPack = async () => {
        setIsLoading(true)
        // Simulating a delay of 5 seconds for loader animation
        await new Promise((resolve) => setTimeout(resolve, 5000))
        await getRandomCardsFromPack()
        await removeItemFromInventory(user, currentPack)
        await getCurrentUser()
        setIsLoading(false)
    }

    const getRandomCardsFromPack = async () => {
        const { contents } = currentPack
        const newCards = getRandomCards(contents.count, contents.odds, allCards)

        newCards.forEach(async (card) => {
            assignRandomCardValues(card)
            try {
                // Format card into data object for API request before passing as parameter to addCardToCollection
                await addCardToCollection(createCardData(card))
            } catch (error) {
                console.log(error)
            }
        })
        setPackContents(newCards)
    }

    const buttonDisablers = !currentPack || user?.onboardingstage <= 6

    return (
        <div className='user-packs panel fill between-column'>
            <div className='panel-header'>
                <h1>ChOOse a PacK</h1>
                <hr />
            </div>
            <Carousel
                uniqueItems={uniquePacks}
                allItems={userPacks}
                setCurrentItem={setCurrentPack}
                emptyMessage={noPacksMessage}
            >
                <UserPack />
            </Carousel>
            <Button
                label='OpeN PacK'
                onClick={openCurrentPack}
                disabled={buttonDisablers}
            />
        </div>
    )
}

export default UserPacks
