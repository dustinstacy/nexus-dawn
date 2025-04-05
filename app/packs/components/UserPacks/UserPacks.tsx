import React, { useEffect, useState } from "react"

import { addCardToCollection, removeItemFromInventory } from "@api"
import { Button } from "@components"
import { ICard, IItem, User } from "@interfaces"
import { assignRandomCardValues, getRandomCards } from "@randomizers"
import { useCardsStore, useUserStore } from "@stores"
import { createCardData, uniqueItemsFilter } from "@utils"

import { Carousel, UserPack } from "./components"
import "./userPacks.scss"

interface UserPacks {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setPackContents: React.Dispatch<React.SetStateAction<Array<ICard> | null>>
}

const UserPacks = ({ setIsLoading, setPackContents }: UserPacks) => {
    const user = useUserStore((state) => state.user)
    const fetchUserCards = useUserStore((state) => state.fetchUserCards)
    const fetchUserData = useUserStore((state) => state.fetchUserData)
    const allCards = useCardsStore((state) => state.allCards)

		const [packPullCount, setPackPullCount] = useState<number>(1); //Default pack counter to 1
    const [currentPack, setCurrentPack] = useState<IItem | null>(null)
    const [currentPackQuantity, setCurrentPackQuantity] = useState<number>(1);
    const noPacksMessage = "Head to the MaRKet to buy more packs"
    // Filtering user's inventory to get only packs and sorting them by level in descending order
    const userPacks = user?.inventory.filter((item) => item?.type === "pack") || []
    // Removing duplicates from userPacks and sorting them by level in descending order
    const uniquePacks = uniqueItemsFilter(userPacks).sort((a, b) => b.level - a.level)

    const openCurrentPack = async () => {
        setIsLoading(true)

        // Simulating a delay of 5 seconds for loader animation
        await new Promise((resolve) => setTimeout(resolve, 5000))
				await getRandomCardsFromPack()
				await removeItemFromInventory(user as User, currentPack as IItem)
				await fetchUserData("inventory")
				await fetchUserCards()
        setIsLoading(false)
    }

    const openMultiplePacks = async () => {
        setIsLoading(true)

        // Simulating a delay of 5 seconds for loader animation
        await new Promise((resolve) => setTimeout(resolve, 5000))
				await getRandomCardsFromPack(packPullCount);
				await removeItemFromInventory(user as User, currentPack as IItem, packPullCount)
				await fetchUserData("inventory")
				await fetchUserCards()

				setIsLoading(false)
    }

    const getRandomCardsFromPack = async (numberOfPackToOpen: number  = 1) => {
        const { contents } = currentPack!
				const cardPackCount = contents.count;
				const totalCardsToPull = cardPackCount * numberOfPackToOpen;
        const newCards = getRandomCards(totalCardsToPull, contents.odds, allCards)

        newCards.forEach(async (card) => {
            assignRandomCardValues(card)
            await addCardToCollection(createCardData(card))
        })
        setPackContents(newCards)
    }

		const incrementPackCount = () => {
			if(packPullCount === userPacks.length) {
				return;
			}

			setPackPullCount(packPullCount + 1);
		}
		const decrementPackCount = () => {
			if(packPullCount === 1){
				return;
			}

			setPackPullCount(packPullCount - 1);
		}
		
    const buttonDisablers = !currentPack || (user?.onboardingStage as number) <= 1
		const disableMultiPackOpen = buttonDisablers || packPullCount > currentPackQuantity|| packPullCount <= 0;
    
    useEffect(() => {
      const filteredPackCount = userPacks.filter((item) => item.name === currentPack?.name).length
      if(filteredPackCount < packPullCount && currentPack){
        setPackPullCount(filteredPackCount);
      }
      setCurrentPackQuantity(userPacks.filter((item) => item.name === currentPack?.name).length);
    }, [currentPack]);

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
							<UserPack itemData={currentPack} allItems={userPacks} />
            </Carousel>

            <div className="button-menu">
						    <Button label='OpeN PacK' onClick={openCurrentPack} disabled={buttonDisablers} />
						    <Button label="-" onClick={decrementPackCount} disabled={packPullCount <= 0} />
						    <Button label={`OpeN ${packPullCount} PacK(s)`} onClick={openMultiplePacks} disabled={disableMultiPackOpen} />
						    <Button label="+" onClick={incrementPackCount} disabled={packPullCount === currentPackQuantity} />
            </div>

            
            
        </div>
    )
}

export default UserPacks
