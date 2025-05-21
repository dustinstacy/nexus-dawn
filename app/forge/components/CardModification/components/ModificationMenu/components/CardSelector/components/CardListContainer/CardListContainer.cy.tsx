import { CypressAppRouterContext } from '@cypressUtils'
import stores from '@stores'

import CardListContainer from './CardListContainer'

describe('CardListContainer', () => {
	it('handles clicks ok', () => {
		const setCardSelectOpenStub = cy.stub().as('setCardSelectOpenStub')
		const setSelectedCardStub = cy.stub().as('setSelectedCardStub')

		const cards = [
			{
				_id: '1',
				name: 'Card 1',
				values: [1, 2, 3, 4]
			},
			{
				_id: '2',
				name: 'Card 2',
				values: [5, 6, 7, 8]
			}
		]

		cy.stub(stores, 'useUserStore').returns(cards)

		cy.mount(
			<CypressAppRouterContext>
				<CardListContainer
					setCardSelectOpen={setCardSelectOpenStub}
					setSelectedCard={setSelectedCardStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('card-1').click()
		cy.get('@setCardSelectOpenStub').should('have.been.calledWith', false)
		cy.get('@setSelectedCardStub').should('have.been.calledWith', cards[0])
		cy.getDataCy('cancel-btn').click()
		cy.get('@setCardSelectOpenStub').should('have.been.calledWith', false)
	})
})
