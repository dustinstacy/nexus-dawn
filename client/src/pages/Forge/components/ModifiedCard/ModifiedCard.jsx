import React, { useEffect, useState } from 'react'

import { Button, Card } from '@components'
import { useGlobalContext } from '@context'

import './ModifiedCard'

const ModifiedCard = ({
    selectedCard,
    setModificationComplete,
    setSelectedCard,
}) => {
    const { userCards } = useGlobalContext()

    const [updatedCard, setUpdatedCard] = useState(null)

    useEffect(() => {
        updateSelectedCard()
    }, [])

    const updateSelectedCard = async () => {
        const updatedSelectedCard = userCards.find(
            (card) => card._id === selectedCard._id
        )
        setUpdatedCard(updatedSelectedCard)
        setSelectedCard(null)
    }

    return (
        <div>
            {updatedCard && <Card card={updatedCard} isShowing />}
            <Button
                label='Exit'
                onClick={() => setModificationComplete(false)}
            />
        </div>
    )
}

export default ModifiedCard
