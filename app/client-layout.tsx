"use client"

import { usePathname } from "next/navigation"
import React, { useEffect } from "react"

import { NavBar } from "@components"
import { useUserStore } from "@stores"
import { useItemsStore } from "@stores"
import { useOpponentsStore } from "@stores"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const checkForUser = useUserStore((state) => state.checkForUser)
    const allItems = useItemsStore((state) => state.allItems)
    const allOpponents = useOpponentsStore((state) => state.allOpponents)
    const fetchItems = useItemsStore((state) => state.fetchItems)
    const fetchOpponents = useOpponentsStore((state) => state.fetchOpponents)

    const isAuthRoute = pathname.startsWith("/auth")
    const isBattleRoute = pathname === "/battle"

    useEffect(() => {
        checkForUser()
    }, [])

    useEffect(() => {
        if (allItems?.length === 0 || allOpponents?.length === 0) {
            console.log("Fetching items and opponents")
            fetchItems()
            fetchOpponents()
        }
    }, [])

    return (
        <div>
            {!isBattleRoute && <NavBar login={isAuthRoute ? false : true} />}
            {children}
        </div>
    )
}
