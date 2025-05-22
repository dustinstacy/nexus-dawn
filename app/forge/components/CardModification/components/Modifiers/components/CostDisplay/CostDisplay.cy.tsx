import { CypressAppRouterContext } from '@cypressUtils'
import { ICard, IItem, User } from '@interfaces'
import stores from '@stores'

import api from '@api'
import localApi from '../../../../api'
import CostDisplay from './CostDisplay'

describe('CostDisplay', () => {
	const aquaImg = 'aqua.png'
	const fluxImg = 'flux.png'
	const user = {
		inventory: [
			{
				_id: '1',
				name: 'aqua',
				image: aquaImg
			}
		] as IItem[]
	} as User
	const modCost = {
		aquaType: {
			image: aquaImg,
			name: 'aqua'
		} as IItem,
		aquaAmount: 10,
		fluxType: {
			image: fluxImg,
			name: 'flux'
		} as IItem,
		fluxAmount: 0
	}
	const selectedCard = {
		_id: '1',
		values: [2, 3, 4, 5]
	} as ICard
	const selectedCardValues = [2, 3, 4, 4]
	const userCard = {
		_id: '1'
	} as ICard

	beforeEach(() => {
		const setModificationCompleteStub = cy.stub().as('setModificationCompleteStub')
		const setSelectedCardStub = cy.stub().as('setSelectedCardStub')

		cy.stub(localApi, 'updateCardValues').as('updateCardValuesStub')
		cy.stub(api, 'removeItemFromInventory').as('removeItemFromInventoryStub').resolves()

		cy.stub(stores, 'useUserStore').returns({
			user,
			userCards: [userCard] as ICard[],
			fetchUserCards: cy
				.stub()
				.as('fetchUserCardsStub')
				.resolves({
					user: {} as User,
					userCards: []
				}),
			fetchUserData: cy.stub().as('fetchUserDataStub').resolves()
		})

		cy.mount(
			<CypressAppRouterContext>
				<CostDisplay
					modCost={modCost}
					setModificationComplete={setModificationCompleteStub}
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCardStub}
					selectedCardValues={selectedCardValues}
				/>
			</CypressAppRouterContext>
		)
	})

	it('renders correctly', () => {
		cy.getDataCy('aqua-img').should('have.attr', 'src', aquaImg)
		cy.getDataCy('flux-img').should('have.attr', 'src', fluxImg)
		cy.getDataCy('aqua-count').should('contain', '1')
		cy.getDataCy('aqua-amount').should('contain', '10')
		cy.getDataCy('flux-count').should('contain', '0')
		cy.getDataCy('flux-amount').should('contain', '0')
	})

	it('completes modification', () => {
		cy.getDataCy('complete-modification-btn').click()
		cy.get('@updateCardValuesStub').should('have.been.calledWith', selectedCard, selectedCardValues)
		cy.get('@removeItemFromInventoryStub').should('have.been.calledWith', user, modCost.aquaType)
		cy.get('@removeItemFromInventoryStub').should('have.been.calledWith', user, modCost.fluxType)
		cy.get('@setSelectedCardStub').should('have.been.calledWith', userCard)
		cy.get('@fetchUserCardsStub').should('have.been.called')
	})
})
