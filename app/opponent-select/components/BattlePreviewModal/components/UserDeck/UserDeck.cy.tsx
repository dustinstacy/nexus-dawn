import api from '@api'
import { headerStyle } from '@assets'
import { CypressAppRouterContext } from '@cypressUtils'
import { ICard, IItem, IOpponent } from '@interfaces'
import stores from '@stores'
import utils from '@utils'

import UserDeck from './UserDeck'

describe('UserDeck', () => {
	// Mock data for testing
	const mockOpponent: IOpponent = {
		name: 'Test Opponent',
		avatar: '/avatar.jpg',
		image: '/opponent-image.jpg',
		color: '#9e0e24',
		level: 1,
		deckOdds: { Common: 80, Uncommon: 15, Rare: 5 },
		cardCount: 10,
		minPower: 100,
		maxPower: 200,
		rules: ['Best of 3', 'No Special Cards'],
		rounds: 3,
		rewards: {
			xp: 100,
			coin: 200,
			items: [{ name: 'Basic Pack', _id: 'mockItem1' } as IItem]
		}
	}

	const mockCards: ICard[] = [
		{
			_id: 'card1',
			name: 'Card 1',
			image: '/card1.jpg',
			values: [10, 10, 10, 10],
			rarity: 'Common'
		} as ICard,
		{
			_id: 'card2',
			name: 'Card 2',
			image: '/card2.jpg',
			values: [8, 8, 8, 8],
			rarity: 'Common'
		} as ICard,
		{
			_id: 'card3',
			name: 'Card 3',
			image: '/card3.jpg',
			values: [15, 15, 15, 15],
			rarity: 'Rare'
		} as ICard
	]

	const mockUserDeck: ICard[] = [
		{
			_id: 'card1',
			name: 'Card 1',
			image: '/card1.jpg',
			values: [10, 10, 10, 10],
			rarity: 'Common'
		} as ICard,
		{
			_id: 'card2',
			name: 'Card 2',
			image: '/card2.jpg',
			values: [8, 8, 8, 8],
			rarity: 'Common'
		} as ICard
	]

	const mockOptimizedDeck: ICard[] = [
		{
			_id: 'card3',
			name: 'Card 3',
			image: '/card3.jpg',
			values: [15, 15, 15, 15],
			rarity: 'Rare'
		} as ICard,
		{
			_id: 'card1',
			name: 'Card 1',
			image: '/card1.jpg',
			values: [10, 10, 10, 10],
			rarity: 'Common'
		} as ICard
	]

	const headerStyleValue = '/header-style.png'
	let useUserStoreStub: any
	let calculateOptimizedDeckStub: any

	// Set up mocks before each test
	beforeEach(() => {
		// Mock API methods
		cy.stub(api, 'addCardToDeck').as('addCardToDeckStub').resolves()
		cy.stub(api, 'removeCardFromDeck').as('removeCardFromDeckStub').resolves()

		// Mock user store
		useUserStoreStub = cy.stub(stores, 'useUserStore').returns({
			userCards: mockCards,
			userDeck: mockUserDeck,
			fetchUserDeck: cy.stub().as('fetchUserDeckStub').resolves(),
			fetchUserCards: cy.stub().as('fetchUserCardsStub').resolves()
		})

		// Mock utility functions
		cy.stub(utils, 'calculateDeckPower')
			.as('calculateDeckPowerStub')
			.callsFake((cards: Array<ICard>) => {
				return cards.reduce(
					(total, card) => total + card.values.reduce((sum, value) => sum + value, 0),
					0
				)
			})

		calculateOptimizedDeckStub = cy
			.stub(utils, 'calculateOptimizedDeck')
			.as('calculateOptimizedDeckStub')
			.returns(mockOptimizedDeck)

		// Mock header style
		cy.stub(headerStyle, 'src').value(headerStyleValue)
	})

	it('renders the component with the header', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('user-deck').should('exist')
		cy.getDataCy('header-wrapper').should('contain', 'Equipped Deck')
		cy.getDataCy('header-style').should('have.attr', 'src', headerStyleValue)
	})

	it('displays the user deck power', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		// The mockUserDeck power should be 40 + 32 = 72
		cy.getDataCy('user-deck-power-value').should('contain', '72')
	})

	it('displays the card count with correct styling when count matches opponent requirement', () => {
		// Set opponent cardCount to match the mockUserDeck length
		const modifiedOpponent = { ...mockOpponent, cardCount: 2 }

		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={modifiedOpponent} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('user-deck-length').should('have.class', 'valid').should('contain', '2')
		cy.getDataCy('user-deck-count').should('contain', '2 / 2')
	})

	it('displays the card count with invalid styling when count does not match', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('user-deck-length').should('have.class', 'invalid').should('contain', '2')
		cy.getDataCy('user-deck-count').should('contain', '2 / 10')
	})

	it('enables Optimize Deck button when optimized deck has higher power', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		// Mock optimized deck has higher power, so button should be enabled
		cy.getDataCy('optimize-deck-button').should('not.have.class', 'disabled')
	})

	it('disables Optimize Deck button when deck is already optimized', () => {
		// Modify the calculateOptimizedDeck to return the current deck
		calculateOptimizedDeckStub.restore()
		cy.stub(utils, 'calculateOptimizedDeck').returns(mockUserDeck)

		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		// Current deck equals optimized deck, button should be disabled
		cy.getDataCy('optimize-deck-button').should('have.class', 'disabled')
	})

	it('contains a link to the collection page for editing deck', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('edit-deck-button').click()
		// router:push is a stub that is set up in cypress\support\utils\index.tsx
		cy.get('@router:push').should('be.calledWith', '/collection')
	})

	it('fetches user deck and cards data on mount', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		cy.get('@fetchUserDeckStub').should('be.called')
		cy.get('@fetchUserCardsStub').should('be.called')
	})

	it('updates optimized deck state when data is ready', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		// The calculateOptimizedDeck and calculateDeckPower functions should be called
		cy.get('@calculateOptimizedDeckStub').should('be.called')
		cy.get('@calculateDeckPowerStub').should('be.called')
	})

	it('optimizes the deck when Optimize Deck button is clicked', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('optimize-deck-button').click()

		// Should remove card2 (not in optimized deck)
		cy.get('@removeCardFromDeckStub').should('be.calledWith', Cypress.sinon.match({ _id: 'card2' }))

		// Should add card3 (in optimized deck but not in current deck)
		cy.get('@addCardToDeckStub').should('be.calledWith', Cypress.sinon.match({ _id: 'card3' }))

		// Should fetch user data after optimization
		cy.get('@fetchUserCardsStub').should('be.called')
		cy.get('@fetchUserDeckStub').should('be.called')
	})

	it('does not modify cards that are already in both decks during optimization', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('optimize-deck-button').click()

		// Should not remove or add card1 (present in both decks)
		cy.get('@removeCardFromDeckStub').should(
			'not.be.calledWith',
			Cypress.sinon.match({ _id: 'card1' })
		)
		cy.get('@addCardToDeckStub').should('not.be.calledWith', Cypress.sinon.match({ _id: 'card1' }))
	})

	it('updates the deck state when userDeck changes', () => {
		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		// Create a new reference for userDeck to simulate state update
		const updatedDeck = [...mockUserDeck, mockCards[2]]

		// Update the mock return value and trigger a re-render
		useUserStoreStub.restore()
		cy.stub(stores, 'useUserStore').returns({
			userCards: mockCards,
			userDeck: updatedDeck,
			fetchUserDeck: cy.stub().resolves(),
			fetchUserCards: cy.stub().resolves()
		})

		cy.mount(
			<CypressAppRouterContext>
				<UserDeck selectedOpponent={mockOpponent} />
			</CypressAppRouterContext>
		)

		// After userDeck changes, calculateDeckPower should be called again
		cy.get('@calculateDeckPowerStub').should('be.calledWith', updatedDeck)
	})
})
