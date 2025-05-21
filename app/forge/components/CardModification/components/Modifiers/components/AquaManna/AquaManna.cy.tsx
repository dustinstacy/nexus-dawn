import { CypressAppRouterContext } from '@cypressUtils'
import { CardValues, ICard } from '@interfaces'

import AquaManna from './AquaManna'

describe('AquaManna', () => {
	const cardValues: CardValues = [2, 3, 4, 5]
	const card: ICard = {
		_id: '1',
		name: 'Card 1',
		number: 1,
		rarity: 'Common',
		image: 'image.png',
		values: cardValues
	}
	let setModificationInProgressStub: Cypress.Agent<sinon.SinonStub>

	beforeEach(() => {
		setModificationInProgressStub = cy.stub().as('setModificationInProgressStub')
	})

	it('renders and allows interactions', () => {
		cy.mount(
			<CypressAppRouterContext>
				<AquaManna
					selectedCard={card}
					selectedCardValues={cardValues}
					setModificationInProgress={setModificationInProgressStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('card-1').should('exist')

		cy.getDataCy('cancel').click()
		cy.get('@setModificationInProgressStub').should('have.been.calledWith', false)

		cy.getDataCy(`value-${card.values[0]}`).contains(card.values[0])
	})
})
