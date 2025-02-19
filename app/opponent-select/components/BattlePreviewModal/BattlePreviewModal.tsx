import React, { useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useRouter } from "next/navigation"

import { Button, ModalOverlay } from "@components"
import { ICard, IOpponent, Odds } from "@interfaces"
import { getRandomCards, assignRandomDeckValues } from "@randomizers"
import { useCardsStore, useOpponentsStore, useUserStore } from "@stores"

import { SelectedOpponent, UserDeck } from "./components"
import "./battlePreviewModal.scss"

// Renders the battle preview overlay upon selection of an opponent
// Allows the user to view the selected opponent, battle rules, and user deck.
// Provides options to edit the deck and start the battle.
const BattlePreviewModal = () => {
    const userDeck = useUserStore((state) => state.userDeck)
    const allCards = useCardsStore((state) => state.allCards)
    const selectedOpponent = useOpponentsStore((state) => state.selectedOpponent)
    const setSelectedOpponent = useOpponentsStore((state) => state.setSelectedOpponent)
    const selectedOpponentDeck = useOpponentsStore((state) => state.selectedOpponentDeck)
    const setSelectedOpponentDeck = useOpponentsStore((state) => state.setSelectedOpponentDeck)

    const { deckOdds, cardCount, minPower, maxPower } = selectedOpponent || {}

    // Randomize and set opponents deck on component mount
    useEffect(() => {
        getOpponentDeck()
    }, [selectedOpponent])

    const router = useRouter()

    const getOpponentDeck = () => {
        const opponentRandomCards = getRandomCards(cardCount as number, deckOdds as Odds, allCards as Array<ICard>)
        assignRandomDeckValues(opponentRandomCards, minPower as number, maxPower as number)
        const currentOpponentDeck = opponentRandomCards.map((card, i) => {
            return {
                image: card.image,
                values: card.values,
                _id: card._id! + i,
            }
        })
        setSelectedOpponentDeck(currentOpponentDeck as Array<ICard>)
    }

    // Navigate to battle page with stored opponent and opponent deck statee
    const startBattle = () => {
        router.push("/battle-intro")
    }

    return (
        <ModalOverlay>
            <div className='battle-preview center-column'>
                {selectedOpponentDeck && (
                    <>
                        <AiOutlineCloseCircle className='close-modal' onClick={() => setSelectedOpponent(null)} />
                        <SelectedOpponent selectedOpponent={selectedOpponent as IOpponent} />
                        <UserDeck selectedOpponent={selectedOpponent!} />

                        <Button
                            label='Start Battle'
                            onClick={startBattle}
                            disabled={userDeck?.length !== selectedOpponent?.cardCount}
                        />
                    </>
                )}
            </div>
        </ModalOverlay>
    )
}

export default BattlePreviewModal
