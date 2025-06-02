import { CypressAppRouterContext } from '@cypressUtils'
import { CardValues, ICard } from '@interfaces'
import stores from '@stores'

import CardSelector from './CardSelector'

describe('CardSelector', () => {
	let setSelectedCardStub: Cypress.Agent<sinon.SinonStub>
	const cards = [
		{
			_id: '1',
			name: 'Card 1',
			values: [1, 2, 3, 4] as CardValues
		},
		{
			_id: '2',
			name: 'Card 2',
			values: [5, 6, 7, 8] as CardValues
		}
	] as ICard[]

	beforeEach(() => {
		setSelectedCardStub = cy.stub().as('setSelectedCardStub')

		cy.stub(stores, 'useUserStore').returns(cards)
	})

	it('renders with no card selected', () => {
		cy.mount(
			<CypressAppRouterContext>
				<CardSelector
					selectedCard={null}
					setSelectedCard={setSelectedCardStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('select-card').click()
		cy.getDataCy('modal-overlay').should('be.visible')
		cy.getDataCy('card-1').click()
		cy.get('@setSelectedCardStub').should('have.been.calledWith', cards[0])
		cy.getDataCy('modal-overlay').should('not.exist')
	})

	it('renders with card selected', () => {
		cy.mount(
			<CypressAppRouterContext>
				<CardSelector
					selectedCard={cards[0]}
					setSelectedCard={setSelectedCardStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('selected-card').should('exist')
		cy.getDataCy('value-1').should('exist')
		cy.getDataCy('unselect-card').click()
		cy.get('@setSelectedCardStub').should('have.been.calledWith', null)
	})
})
