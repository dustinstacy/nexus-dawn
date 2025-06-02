import { CypressAppRouterContext } from '@cypressUtils'
import { ICard } from '@interfaces'
import stores from '@stores'

import ModifiedCard from './ModifiedCard'

describe('ModifiedCard', () => {
	let setSelectedCardStub: Cypress.Agent<sinon.SinonStub>
	let setModificationCompleteStub: Cypress.Agent<sinon.SinonStub>
	const card: ICard = {
		_id: '1',
		name: 'Card 1',
		number: 1,
		rarity: 'Common',
		image: 'image.png',
		values: [1, 2, 3, 4]
	}

	beforeEach(() => {
		cy.stub(stores, 'useUserStore').returns({
			userCards: [card],
			fetchUserCards: cy.stub().as('fetchUserCardsStub').resolves()
		})

		setSelectedCardStub = cy.stub().as('setSelectedCardStub')
		setModificationCompleteStub = cy.stub().as('setModificationCompleteStub')
	})

	it('renders', () => {
		cy.mount(
			<CypressAppRouterContext>
				<ModifiedCard
					selectedCard={null}
					setSelectedCard={setSelectedCardStub}
					setModificationComplete={setModificationCompleteStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('card-1').should('not.exist')
		cy.getDataCy('exit-modification').click()
		cy.get('@setModificationCompleteStub').should('have.been.calledWith', false)
	})

	it.only('shows selected card', () => {
		cy.mount(
			<CypressAppRouterContext>
				<ModifiedCard
					selectedCard={card}
					setSelectedCard={setSelectedCardStub}
					setModificationComplete={setModificationCompleteStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('card-1').should('exist')
	})
})
