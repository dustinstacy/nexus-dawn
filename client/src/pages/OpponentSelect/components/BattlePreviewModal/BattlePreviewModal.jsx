import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { getRandomCards, assignRandomDeckValues } from '@utils/randomizers'

import { SelectedOpponent, UserDeck } from './components'
import './BattlePreviewModal.scss'

// Renders the battle preview overlay upon selection of an opponent
// Allows the user to view the selected opponent, battle rules, and user deck.
// Provides options to edit the deck and start the battle.
const BattlePreviewModal = ({ selectedOpponent, setSelectedOpponent }) => {
    const navigate = useNavigate()
    const { allCards, userDeck } = useGlobalContext()
    const { deckOdds, cardCount, minPower, maxPower, rewards } =
        selectedOpponent

    const [selectedOpponentDeck, setSelectedOpponentDeck] = useState([])

    // Randomize and set opponents deck on component mount
    useEffect(() => {
        getOpponentDeck()
    }, [selectedOpponent])

    const getOpponentDeck = () => {
        const opponentRandomCards = getRandomCards(
            cardCount,
            deckOdds,
            allCards
        )
        assignRandomDeckValues(opponentRandomCards, minPower, maxPower)
        const currentOpponentDeck = opponentRandomCards.map((card, i) => {
            return {
                image: card.image,
                values: card.values,
                _id: card._id + i,
            }
        })
        setSelectedOpponentDeck((prevDeck) => currentOpponentDeck)
    }

    // Navigate to battle page with stored opponent and opponent deck statee
    const startBattle = () => {
        navigate('/battleIntro', {
            state: {
                opponent: selectedOpponent,
                opponentDeck: selectedOpponentDeck,
            },
        })
    }

    return (
        <ModalOverlay>
            <div className='battle-preview center-column'>
                {selectedOpponentDeck && (
                    <>
                        <AiOutlineCloseCircle
                            className='close-modal'
                            onClick={() => setSelectedOpponent(null)}
                        />
                        <SelectedOpponent selectedOpponent={selectedOpponent} />
                        <UserDeck selectedOpponent={selectedOpponent} />

                        <Button
                            label='Start Battle'
                            onClick={(e) => startBattle(e)}
                            disabled={
                                userDeck?.length !== selectedOpponent.cardCount
                            }
                        />
                    </>
                )}
            </div>
        </ModalOverlay>
    )
}

export default BattlePreviewModal
