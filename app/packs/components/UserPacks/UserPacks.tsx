import React, { useState } from 'react'

import api from '@api'
import { Button } from '@components'
import { ICard, IItem, User } from '@interfaces'
import { assignRandomCardValues, getRandomCards } from '@randomizers'
import stores from '@stores'
import utils from '@utils'

import { Carousel, UserPack } from './components'
import './userPacks.scss'

interface UserPacks {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	setPackContents: React.Dispatch<React.SetStateAction<Array<ICard> | null>>
}

const UserPacks = ({ setIsLoading, setPackContents }: UserPacks) => {
	const { createCardData, uniqueItemsFilter } = utils
	const { addCardToCollection, removeItemFromInventory } = api
	const { user, fetchUserCards, fetchUserData } = stores.useUserStore((state) => state)
	const allCards = stores.useCardsStore((state) => state.allCards) || []
	const [currentPack, setCurrentPack] = useState<IItem | null>(null)

	const noPacksMessage = 'Head to the MaRKet to buy more packs'
	// Filtering user's inventory to get only packs and sorting them by level in descending order
	const userPacks = user?.inventory?.filter((item) => item?.type === 'pack') || []
	// Removing duplicates from userPacks and sorting them by level in descending order
	const uniquePacks = uniqueItemsFilter(userPacks).sort((a, b) => b.level - a.level)

	const openCurrentPack = async () => {
		setIsLoading(true)
		// Simulating a delay of 5 seconds for loader animation
		await new Promise((resolve) => setTimeout(resolve, 5000))
		await getRandomCardsFromPack()
		await removeItemFromInventory(user as User, currentPack as IItem)
		await fetchUserData('inventory')
		await fetchUserCards()
		setIsLoading(false)
	}

	const getRandomCardsFromPack = async () => {
		const { contents } = currentPack!
		const newCards = getRandomCards(contents.count, contents.odds, allCards)

		newCards.forEach(async (card) => {
			assignRandomCardValues(card)
			await addCardToCollection(createCardData(card))
		})
		setPackContents(newCards)
	}

	const buttonIsDisabled = !currentPack || (user?.onboardingStage as number) <= 1

	return (
		<div
			className="user-packs panel fill between-column"
			data-cy="user-packs"
		>
			<div className="panel-header">
				<h1 data-cy="user-packs-title">ChOOse a PacK</h1>
				<hr />
			</div>
			<Carousel
				uniqueItems={uniquePacks}
				allItems={userPacks}
				setCurrentItem={setCurrentPack}
				emptyMessage={noPacksMessage}
			>
				<UserPack
					itemData={currentPack}
					allItems={userPacks}
				/>
			</Carousel>
			<Button
				label="OpeN PacK"
				onClick={openCurrentPack}
				disabled={buttonIsDisabled}
				dataCy="open-pack-button"
			/>
		</div>
	)
}

export default UserPacks
