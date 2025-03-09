import React, { useState } from "react"

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

		const [pullCount, setPullCount] = useState<number>(1); //Default pack counter to 1
    const [currentPack, setCurrentPack] = useState<IItem | null>(null)

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
				await getRandomCardsFromPack(pullCount);
				await removeItemFromInventory(user as User, currentPack as IItem, pullCount)
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

		const incrementValue = () => {
			if(pullCount === userPacks.length) {
				return;
			}

			setPullCount(pullCount + 1);
		}
		const decrementValue = () => {
			if(pullCount === 1){
				return;
			}

			setPullCount(pullCount - 1);
		}
		
    const buttonDisablers = !currentPack || (user?.onboardingStage as number) <= 1
		const disableMultiPackOpen = buttonDisablers || pullCount > userPacks.length || pullCount <= 0;
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
						<Button label='OpeN PacK' onClick={openCurrentPack} disabled={buttonDisablers} />
						<Button label="+" onClick={incrementValue} disabled={pullCount > userPacks.length} />
						<Button label="-" onClick={decrementValue} disabled={pullCount <= 0} />
						<Button label={`OpeN ${pullCount} PacK(s)`} onClick={openMultiplePacks} disabled={disableMultiPackOpen} />

            
            
        </div>
    )
}

export default UserPacks
