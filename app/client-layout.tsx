'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import { NavBar } from '@components'
import { useCardsStore, useItemsStore, useOpponentsStore, useUserStore } from '@stores'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const user = useUserStore((state) => state.user)
	const userCards = useUserStore((state) => state.userCards)
	const checkForUser = useUserStore((state) => state.checkForUser)
	const fetchUserCards = useUserStore((state) => state.fetchUserCards)
	const fetchUserDeck = useUserStore((state) => state.fetchUserDeck)
	const allCards = useCardsStore((state) => state.allCards)
	const allItems = useItemsStore((state) => state.allItems)
	const allOpponents = useOpponentsStore((state) => state.allOpponents)
	const fetchCards = useCardsStore((state) => state.fetchCards)
	const fetchItems = useItemsStore((state) => state.fetchItems)
	const fetchOpponents = useOpponentsStore((state) => state.fetchOpponents)

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
	}, [user, checkForUser, fetchUserCards, fetchUserDeck, userCards.length])

	const componentHasLoaded = React.useRef(false)

	useEffect(() => {
		if (componentHasLoaded.current) return

		if (allItems?.length === 0 || allOpponents?.length === 0 || allCards?.length === 0) {
			fetchCards()
			fetchItems()
			fetchOpponents()
		}

		componentHasLoaded.current = true
		// eslint-disable-next-line react-hooks/exhaustive-deps -- only run once
	}, [])

	return (
		<div>
			{!isBattleRoute && <NavBar login={isAuthRoute ? false : true} />}
			{children}
		</div>
	)
}
