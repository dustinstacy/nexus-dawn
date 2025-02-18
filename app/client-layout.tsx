"use client"

import { usePathname } from "next/navigation"
import { NavBar } from "@components"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const isAuthRoute = pathname.startsWith("/auth")
    const isBattleRoute = pathname === "/battle"

    return (
        <div>
            {!isBattleRoute && <NavBar login={isAuthRoute ? false : true} />}
            {children}
        </div>
    )
}
