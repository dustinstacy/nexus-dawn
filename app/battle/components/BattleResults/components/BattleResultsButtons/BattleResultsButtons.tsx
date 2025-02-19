import React from "react"
import { useRouter } from "next/navigation"

import { postBattleLog } from "@api"
import { Button } from "@components"

import "./battleResultsButtons.scss"
import { useOpponentsStore } from "@stores"

interface BattleResultsButtonsProps {
    loading: boolean
}

const BattleResultsButtons = ({ loading }: BattleResultsButtonsProps) => {
    const setSelectedOpponent = useOpponentsStore((state) => state.setSelectedOpponent)
    const setSelectedOpponentDeck = useOpponentsStore((state) => state.setSelectedOpponentDeck)
    const router = useRouter()

    const handleClick = async () => {
        const battleLog = localStorage.getItem("battleLog")
        await postBattleLog(battleLog as string)
        removeStateFromLocalStorage()
    }

    // Navigate to battle intro page with stored opponent and opponent deck state
    const rematch = async () => {
        await handleClick()
        router.push("/battle-intro", {})
    }

    const selectOpponent = async () => {
        await handleClick()
        setSelectedOpponent(null)
        setSelectedOpponentDeck(null)
        router.push("/opponent-select")
    }

    const mainMenu = async () => {
        await handleClick()
        setSelectedOpponent(null)
        setSelectedOpponentDeck(null)
        router.push("/")
    }

    const removeStateFromLocalStorage = () => {
        localStorage.removeItem("battleLog")
    }

    return (
        <div className='results-buttons'>
            {!loading && (
                <>
                    <Button label='Select Opponent' onClick={selectOpponent} />
                    <Button label='Rematch' onClick={rematch} />
                    <Button label='Main Menu' onClick={mainMenu} />
                </>
            )}
        </div>
    )
}

export default BattleResultsButtons
