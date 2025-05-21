import { CypressAppRouterContext } from '@cypressUtils'
import { CardValues, ICard } from '@interfaces'

import AquaFortis from './AquaFortis'

describe('AquaFortis', () => {
	const cardValues: CardValues = [2, 3, 4, 5]
	const card: ICard = {
		_id: '1',
		name: 'Card 1',
		number: 1,
		rarity: 'Common',
		image: 'image.png',
		values: cardValues
	}

	let setSelectedCardValuesStub: Cypress.Agent<sinon.SinonStub>
	let setModificationInProgressStub: Cypress.Agent<sinon.SinonStub>

	beforeEach(() => {
		setSelectedCardValuesStub = cy.stub().as('setSelectedCardValuesStub')
		setModificationInProgressStub = cy.stub().as('setModificationInProgressStub')
	})

	it('renders and allows interactions', () => {
		cy.mount(
			<CypressAppRouterContext>
				<AquaFortis
					selectedCard={card}
					selectedCardValues={cardValues}
					setSelectedCardValues={setSelectedCardValuesStub}
					setModificationInProgress={setModificationInProgressStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('card-1').should('exist')

		cy.getDataCy('cancel').click()
		cy.get('@setModificationInProgressStub').should('have.been.calledWith', false)

		cy.getDataCy('reset').click()
		cy.get('@setSelectedCardValuesStub').should('have.been.calledWith', card.values)

		cy.getDataCy(`value-${card.values[0]}`).contains(card.values[0]).click()
		cy.get('@setSelectedCardValuesStub').should('have.been.calledWith', [
			card.values[0] - 1,
			card.values[1],
			card.values[2],
			card.values[3]
		])

		cy.getDataCy(`value-${card.values[3]}`).contains(card.values[3]).click()
		cy.get('@setSelectedCardValuesStub').should('have.been.calledWith', [
			card.values[0],
			card.values[1],
			card.values[2],
			card.values[3] + 1
		])
	})
})
