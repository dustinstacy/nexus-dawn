"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { ModalOverlay } from "@components"
import { useOpponentsStore, useUserStore } from "@stores"

import "./battleIntro.scss"

const BattleIntro = () => {
    const user = useUserStore((state) => state.user)
    const selectedOpponent = useOpponentsStore((state) => state.selectedOpponent)
    const router = useRouter()

    // Navigate to battle page with stored opponent and opponent deck state after animation
    useEffect(() => {
        setTimeout(() => {
            router.push("/battle")
        }, 4000)
    }, [])

    return (
        <ModalOverlay>
            <div className='battle-intro fill between-column'>
                <div className='p2-intro start'>
                    <img
                        src={selectedOpponent?.avatar}
                        style={{ background: selectedOpponent?.color }}
                        alt='p2 image'
                    />
                    <h2>{selectedOpponent?.name}</h2>
                </div>
                <div className='center versus'>
                    <h1>VS</h1>
                </div>
                <div className='p1-intro end '>
                    <h2>{user?.username}</h2>
                    <img src={user?.image} style={{ background: user?.color }} alt='p1 image' />
                </div>
            </div>
        </ModalOverlay>
    )
}

export default BattleIntro
