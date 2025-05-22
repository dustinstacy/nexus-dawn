import { CypressAppRouterContext } from '@cypressUtils'
import { CardValues, ICard } from '@interfaces'
import AquaRegia from './AquaRegia'

describe('AquaRegia', () => {
	const cardValues: CardValues = [2, 3, 4, 5]
	const card: ICard = {
		_id: '1',
		name: 'Card 1',
		number: 1,
		rarity: 'Common',
		image: 'image.png',
		values: cardValues
	}

	beforeEach(() => {
		const setSelectedCardValuesStub = cy.stub().as('setSelectedCardValuesStub')
		const setModificationInProgressStub = cy.stub().as('setModificationInProgressStub')

		cy.mount(
			<CypressAppRouterContext>
				<AquaRegia
					selectedCard={card}
					selectedCardValues={cardValues}
					setSelectedCardValues={setSelectedCardValuesStub}
					setModificationInProgress={setModificationInProgressStub}
				/>
			</CypressAppRouterContext>
		)
	})

	it('should rotate values when button is clicked', () => {
		cy.getDataCy('rotate-button').click()
		cy.get('@setSelectedCardValuesStub').should('have.been.calledWith', [
			cardValues[3],
			cardValues[0],
			cardValues[1],
			cardValues[2]
		])
	})

	it('should end the modification when cancel button is clicked', () => {
		cy.getDataCy('cancel-button').click()
		cy.get('@setModificationInProgressStub').should('have.been.calledWith', false)
	})

	it('should reset values when reset button is clicked', () => {
		cy.getDataCy('reset-button').click()
		cy.get('@setSelectedCardValuesStub').should('have.been.calledWith', cardValues)
	})
})
