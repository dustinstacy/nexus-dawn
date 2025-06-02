import { CypressAppRouterContext } from '@cypressUtils'
import { CardValues, ICard } from '@interfaces'

import AquaVitaeSuperior from './AquaVitaeSuperior'

describe('AquaRegiaSuperior', () => {
	const cardValues: CardValues = [2, 3, 4, 5]
	const card: ICard = {
		_id: '1',
		name: 'Card 1',
		number: 1,
		rarity: 'Common',
		image: 'image.png',
		values: cardValues
	}
	const selectedCardValues = [2, '']

	beforeEach(() => {
		const setSelectedCardValuesStub = cy.stub().as('setSelectedCardValuesStub')
		const setModificationInProgressStub = cy.stub().as('setModificationInProgressStub')

		cy.mount(
			<CypressAppRouterContext>
				<AquaVitaeSuperior
					selectedCard={card}
					selectedCardValues={selectedCardValues}
					setSelectedCardValues={setSelectedCardValuesStub}
					setModificationInProgress={setModificationInProgressStub}
				/>
			</CypressAppRouterContext>
		)
	})

	it('selects a mod value when clicked', () => {
		cy.getDataCy(`card-value-${cardValues[0]}`).click()
		cy.getDataCy(`mod-value-${cardValues[0]}`).click().should('have.class', 'selected')
	})

	it('cancels modification', () => {
		cy.getDataCy('cancel-icon').click()
		cy.get('@setModificationInProgressStub').should('have.been.calledWith', false)
	})

	it('resets values when reset button is clicked', () => {
		cy.getDataCy('reset-icon').click()
		cy.get('@setSelectedCardValuesStub').should('have.been.calledWith', Array(4).fill(''))
	})
})
