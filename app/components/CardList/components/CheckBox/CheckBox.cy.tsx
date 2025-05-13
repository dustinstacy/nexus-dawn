import { ICard } from '@interfaces'
import { useUserStore } from '@stores'

import CheckBox from './CheckBox'

describe('<CheckBox />', () => {
	const mockCard: ICard = {
		_id: 'card123',
		name: 'Test Card',
		image: 'test-image.jpg',
		values: [1, 2, 3, 4],
		rarity: 'Common',
		color: '#ff0000',
		selected: false,
		number: 1
	}
	const mockSelectedCard: ICard = {
		...mockCard,
		selected: true
	}

	beforeEach(() => {
		// Set up the user store
		useUserStore.setState({
			userCards: [mockCard],
			userDeck: [],
			fetchUserCards: cy.stub().as('fetchUserCards'),
			fetchUserDeck: cy.stub().as('fetchUserDeck')
		})
	})

	it('renders unchecked checkbox when card is not selected', () => {
		cy.mount(<CheckBox card={mockCard} />)
		cy.getDataCy('checkbox').should('exist')
		cy.getDataCy('checkbox-unchecked').should('exist')
		cy.getDataCy('checkbox-checked').should('not.exist')
	})

	it('renders checked checkbox when card is selected', () => {
		cy.mount(<CheckBox card={mockSelectedCard} />)
		cy.getDataCy('checkbox').should('exist')
		cy.getDataCy('checkbox-checked').should('exist')
		cy.getDataCy('checkbox-unchecked').should('not.exist')
	})

	it('adds card to deck when clicked and card is not selected', () => {
		const api = window.api
		cy.stub(api, 'addCardToDeck').as('addCardToDeck').resolves()
		cy.mount(<CheckBox card={mockCard} />)
		cy.getDataCy('checkbox').click()
		cy.get('@addCardToDeck').should('have.been.calledWith', mockCard)
		cy.get('@fetchUserCards').should('have.been.called')
		cy.get('@fetchUserDeck').should('have.been.called')
	})

	it('removes card from deck when clicked and card is selected', () => {
		const api = window.api

		cy.stub(api, 'removeCardFromDeck').as('removeCardFromDeck').resolves()
		cy.mount(<CheckBox card={mockSelectedCard} />)
		cy.getDataCy('checkbox').click()
		cy.get('@removeCardFromDeck').should('have.been.calledWith', mockSelectedCard)
		cy.get('@fetchUserCards').should('have.been.called')
		cy.get('@fetchUserDeck').should('have.been.called')
	})

	it('shows an alert when trying to add to a full deck', () => {
		// Set up a full deck
		useUserStore.setState({
			userCards: Array(35).fill(mockCard),
			userDeck: Array(35).fill(mockCard),
			fetchUserCards: cy.stub().as('fetchUserCards'),
			fetchUserDeck: cy.stub().as('fetchUserDeck')
		})

		const api = window.api

		cy.stub(api, 'addCardToDeck').as('addCardToDeck').resolves()
		cy.stub(window, 'alert').as('alertStub')
		cy.mount(<CheckBox card={mockCard} />)
		cy.getDataCy('checkbox').click()
		// Check the alert was called
		cy.get('@alertStub').should('have.been.calledWith', 'Your deck is currently full')
		cy.get('@addCardToDeck').should('not.have.been.called')
	})
})
