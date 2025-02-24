import { useEffect } from "react"

import { Button } from "@components"
import { ICard } from "@interfaces"

import { CardSelector, ModificationSelector } from "./components"

interface ModificationMenu {
    selectedCard: ICard | null
    setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
    setCardModification: React.Dispatch<React.SetStateAction<boolean>>
    selectedModification: string
    setSelectedModification: React.Dispatch<React.SetStateAction<string>>
    setModificationInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const ModificationMenu = ({
    selectedCard,
    setSelectedCard,
    selectedModification,
    setSelectedModification,
    setModificationInProgress,
    setCardModification,
}: ModificationMenu) => {
    useEffect(() => {
        if (selectedCard == null) {
            setSelectedModification?.("-")
        }
    }, [selectedCard])

    return (
        <div className='center-column'>
            <div className='mod-panel center'>
                <CardSelector selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
            </div>
            <ModificationSelector
                selectedModification={selectedModification}
                setSelectedModification={setSelectedModification}
            />
            <Button
                label='Modify Card'
                onClick={() => setModificationInProgress?.(true)}
                disabled={selectedModification === null || selectedModification === "-" || !selectedCard}
            />
            <Button label='Exit' onClick={() => setCardModification(false)} />
        </div>
    )
}

export default ModificationMenu
