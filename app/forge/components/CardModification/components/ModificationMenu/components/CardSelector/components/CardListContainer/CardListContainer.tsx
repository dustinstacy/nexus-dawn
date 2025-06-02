import { Button, CardList } from '@components'
import { ICard } from '@interfaces'
import stores from '@stores'

import './CardListContainer'

interface CardListContainer {
	setCardSelectOpen: React.Dispatch<React.SetStateAction<boolean>>
	setSelectedCard: React.Dispatch<React.SetStateAction<ICard | null>>
}

const CardListContainer = ({ setCardSelectOpen, setSelectedCard }: CardListContainer) => {
	const userCards = stores.useUserStore((state) => state.userCards)

	const sortedCards = userCards.sort(
		(a, b) =>
			b.values.reduce((sum, current) => sum + current, 0) -
			a.values.reduce((sum, current) => sum + current, 0)
	)

	const selectCard = (e: React.MouseEvent<HTMLDivElement>, card: ICard) => {
		e.preventDefault()
		setSelectedCard?.(card)
		setCardSelectOpen(false)
	}

	return (
		<div className="start-column">
			<div className="collection-display box start-column">
				<CardList
					cardArray={sortedCards}
					handleClick={selectCard}
				/>
			</div>
			<Button
				label="Cancel"
				onClick={() => setCardSelectOpen(false)}
				dataCy="cancel-btn"
			/>
		</div>
	)
}

export default CardListContainer
