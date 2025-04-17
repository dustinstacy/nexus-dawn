'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import { NavBar } from '@components'
import {
	useCardsStore,
	useItemsStore,
	useOpponentsStore,
	useUserStore
} from '@stores'

export default function ClientLayout({
	children
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const { user, userCards, checkForUser, fetchUserCards, fetchUserDeck } =
		useUserStore((state) => state)
	const { allCards, fetchCards } = useCardsStore((state) => state)
	const { allItems, fetchItems } = useItemsStore((state) => state)
	const { allOpponents, fetchOpponents } = useOpponentsStore((state) => state)

	const isAuthRoute = pathname.startsWith('/auth')
	const isBattleRoute = pathname === '/battle'

	useEffect(() => {
		if (!user) {
			checkForUser()
		}
		if (user && userCards.length === 0) {
			fetchUserCards()
			fetchUserDeck()
		}
	}, [user, userCards.length, checkForUser, fetchUserCards, fetchUserDeck])

	useEffect(() => {
		if (
			allItems?.length === 0 ||
			allOpponents?.length === 0 ||
			allCards?.length === 0
		) {
			fetchCards()
			fetchItems()
			fetchOpponents()
		}
	}, [
		allItems?.length,
		allOpponents?.length,
		allCards?.length,
		fetchCards,
		fetchItems,
		fetchOpponents,
		user
	])

	return (
		<div>
			{!isBattleRoute && <NavBar login={isAuthRoute ? false : true} />}
			{children}
		</div>
	)
}
