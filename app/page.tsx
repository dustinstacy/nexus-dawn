"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"

import { NavBar } from "@components"
// import { Onboarding } from '@components'
import { mainPanels, subPanels } from "@constants"
import { User } from "@interfaces"
import { useAuthStore, useItemsStore, useOpponentsStore } from "@stores"
import { classSet } from "@utils"

import "./styles/home.scss"

export default function Home() {
    const checkToken = useAuthStore((state) => state.checkToken)
    const user = useAuthStore((state) => state.user)
    const fetchItems = useItemsStore((state) => state.fetchItems)
    const fetchOpponents = useOpponentsStore((state) => state.fetchOpponents)

    useEffect(() => {
        checkToken()
    }, [checkToken])

    useEffect(() => {
        if (user) {
            console.log("fetching items")
            fetchItems()
            fetchOpponents()
        }
    }, [user])

    const stage = user?.onboardingStage ?? {}

    const linkClasses = (className: string, type: string) =>
        classSet(`${className}-${type}`, "panel", "start-column", !user ? "disabled" : "")
    const pathname = usePathname()
    return (
        <div>
            {pathname !== "/battle" && <NavBar landing={false} />}
            {/* {(stage as number) <= 5 && <Onboarding />} */}

            <div className='home page start'>
                <div className='home-wrapper '>
                    {mainPanels.map((panel) => (
                        <Link
                            key={panel.className}
                            href={panel.to}
                            className={linkClasses(panel.className, panel.type)}
                        >
                            <p>{panel.text}</p>
                            <h1>{panel.header}</h1>
                        </Link>
                    ))}
                    <div className='subs start-column'>
                        {subPanels(user as User).map((panel) => (
                            <Link
                                key={panel.className}
                                href={panel.to}
                                className={linkClasses(panel.className, panel.type)}
                            >
                                {panel.jsx}
                            </Link>
                        ))}
                        <a className={linkClasses("contact", "sub")} href='https://discord.gg/TTn4pCHxXT'>
                            <h2>Contact</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
