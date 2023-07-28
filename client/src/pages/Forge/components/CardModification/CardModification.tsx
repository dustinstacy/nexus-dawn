import { useEffect, useState } from 'react'

import { ModifiedCard, Modifiers, ModificationMenu } from './components'
import './CardModification.scss'
import { ICard } from 'src/global.interfaces'

interface CardModification {
    setCardModification: React.Dispatch<React.SetStateAction<boolean>>
}

const CardModification = ({ setCardModification }: CardModification) => {
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null)
    const [selectedModification, setSelectedModification] = useState('-')
    const [modificationInProgress, setModificationInProgress] = useState(false)
    const [modificationComplete, setModificationComplete] = useState(false)

    useEffect(() => {
        if (modificationComplete) {
            setModificationInProgress(false)
        }
    }, [modificationComplete])

    return (
        <div className='card-mod start-column'>
            {!modificationInProgress && !modificationComplete && (
                <ModificationMenu
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    selectedModification={selectedModification}
                    setSelectedModification={setSelectedModification}
                    setModificationInProgress={setModificationInProgress}
                    setCardModification={setCardModification}
                />
            )}
            {modificationInProgress && !modificationComplete && (
                <Modifiers
                    selectedCard={selectedCard}
                    selectedModification={selectedModification}
                    setModificationComplete={setModificationComplete}
                    setModificationInProgress={setModificationInProgress}
                />
            )}
            {modificationComplete && (
                <ModifiedCard
                    selectedCard={selectedCard}
                    setModificationComplete={setModificationComplete}
                    setSelectedCard={setSelectedCard}
                />
            )}
        </div>
    )
}

export default CardModification