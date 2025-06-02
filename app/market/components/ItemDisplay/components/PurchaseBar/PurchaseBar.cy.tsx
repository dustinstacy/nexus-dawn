import api from '@api'
import { CypressAppRouterContext } from '@cypressUtils'
import { IItem, Role, User } from '@interfaces'
import stores from '@stores'

import PurchaseBar from './PurchaseBar'
import utils from './utils'

describe('PurchaseBar', () => {
	// Mock data for testing
	const mockItem: IItem = {
		_id: 'item1',
		name: 'Premium Pack',
		image: '/premium-pack.jpg',
		info: 'A premium card pack',
		price: 100,
		level: 1,
		type: 'pack',
		contents: {
			count: 5,
			odds: {
				Common: 70,
				Uncommon: 25,
				Rare: 5
			}
		}
	}

	const mockUser: User = {
		_id: 'user1',
		username: 'testUser',
		email: 'test@example.com',
		coin: 500,
		inventory: [],
		level: 1,
		xp: 0,
		stats: {
			battles: 0,
			draws: 0,
			losses: 0,
			wins: 0
		},
		role: Role.admin,
		activeBattle: false,
		color: '',
		createdAt: '',
		image: '',
		onboardingStage: 0,
		__v: ''
	}

	let deductCoinStub: any
	let useUserStoreStub: any

	// Mock the API functions
	beforeEach(() => {
		deductCoinStub = cy.stub(api, 'deductCoin').as('deductCoinStub').resolves()
		cy.stub(api, 'addItemToInventory').as('addItemToInventoryStub').resolves()

		// Mock the user store
		useUserStoreStub = cy.stub(stores, 'useUserStore').returns({
			user: mockUser,
			fetchUserData: cy.stub().as('fetchUserDataStub').resolves()
		})

		// Mock the calculatePrice utility
		cy.stub(utils, 'calculatePrice').as('calculatePriceStub').returns(100)
	})

	it('renders the component with correct final price', () => {
		const finalPrice = 100
		const setFinalPrice = cy.stub()

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={false}
					setPurchaseComplete={cy.stub()}
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('total').should('be.visible')
		cy.getDataCy('final-price').should('contain', '100')

		// Check for coin image
		cy.getDataCy('coin-image').should('be.visible')
	})

	it('shows previous price and discount for quantities greater than 1', () => {
		const finalPrice = 450 // After 10% discount on 5 items at 100 each
		const setFinalPrice = cy.stub()

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 5, discount: '10%' }}
					purchaseComplete={false}
					setPurchaseComplete={cy.stub()}
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Should show original price
		cy.getDataCy('previous-amount').should('contain', '500')

		// Should show discounted price
		cy.getDataCy('final-price').contains('450').should('be.visible')
	})

	it('disables purchase button when user cannot afford the item', () => {
		const expensivePrice = 1000
		const setFinalPrice = cy.stub()

		// Override the user store to have less coins
		useUserStoreStub.restore()
		cy.stub(stores, 'useUserStore').returns({
			user: { ...mockUser, coin: 50 },
			fetchUserData: cy.stub().resolves()
		})

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={false}
					setPurchaseComplete={cy.stub()}
					finalPrice={expensivePrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Purchase button should be disabled
		cy.getDataCy('purchase-button').should('have.class', 'disabled')
	})

	it('enables purchase button when user can afford the item', () => {
		const affordablePrice = 100
		const setFinalPrice = cy.stub()

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={false}
					setPurchaseComplete={cy.stub()}
					finalPrice={affordablePrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Purchase button should be enabled
		cy.getDataCy('purchase-button').should('not.have.class', 'disabled')
	})

	it('shows purchase complete message after successful purchase', () => {
		const finalPrice = 100
		const setFinalPrice = cy.stub()

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={true}
					setPurchaseComplete={cy.stub()}
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Should show success message
		cy.getDataCy('purchase-complete').should('be.visible')

		// Should not show the total or purchase button
		cy.getDataCy('total').should('not.exist')
		cy.getDataCy('purchase-button').should('not.exist')
	})

	it('calculates final price when chosen item or quantity changes', () => {
		const finalPrice = 0
		const setFinalPrice = cy.stub().as('setFinalPriceStub')

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={false}
					setPurchaseComplete={cy.stub()}
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Should call calculatePrice and setFinalPrice
		cy.get('@calculatePriceStub').should('have.been.called')
		cy.get('@setFinalPriceStub').should('have.been.called')
	})

	it('handles the purchase process correctly', () => {
		const finalPrice = 100
		const setFinalPrice = cy.stub()
		const setPurchaseComplete = cy.stub().as('setPurchaseCompleteStub')

		// Setup a clock to control setTimeout
		cy.clock()

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={false}
					setPurchaseComplete={setPurchaseComplete}
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Click the purchase button
		cy.getDataCy('purchase-button').click()

		// Should show loading spinner
		cy.getDataCy('loading-spinner').should('exist')

		// Advance the clock to complete the purchase
		cy.tick(1500)

		// API calls should have been made
		cy.get('@deductCoinStub').should('have.been.calledWith', mockUser, finalPrice)
		cy.get('@addItemToInventoryStub').should('have.been.calledWith', mockUser, [mockItem])
		cy.get('@fetchUserDataStub').should('have.been.calledWith', 'inventory')
		cy.get('@fetchUserDataStub').should('have.been.calledWith', 'coin')

		// setPurchaseComplete should be called with true
		cy.get('@setPurchaseCompleteStub').should('have.been.calledWith', true)
	})

	it('handles null chosen item', () => {
		const finalPrice = 0
		const setFinalPrice = cy.stub()

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={null}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={false}
					setPurchaseComplete={cy.stub()}
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Component should render without errors
		cy.getDataCy('total').should('be.visible')
	})

	it('handles API errors during purchase', () => {
		const finalPrice = 100
		const setFinalPrice = cy.stub()
		const setPurchaseComplete = cy.stub()

		// Make the API call fail
		deductCoinStub.restore()
		cy.stub(api, 'deductCoin').rejects(new Error('API Error'))

		// Spy on console.error
		cy.spy(console, 'error')

		cy.mount(
			<CypressAppRouterContext>
				<PurchaseBar
					chosenItem={mockItem}
					chosenQuantity={{ amount: 1, discount: '0' }}
					purchaseComplete={false}
					setPurchaseComplete={setPurchaseComplete}
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
				/>
			</CypressAppRouterContext>
		)

		// Click the purchase button
		cy.getDataCy('purchase-button').click()

		// Should log the error
		cy.wrap(console.error).should(
			'be.calledWith',
			'Error completing purchase:',
			Cypress.sinon.match.instanceOf(Error)
		)
	})
})
