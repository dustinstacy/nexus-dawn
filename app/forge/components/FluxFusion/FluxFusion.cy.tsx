import api from '@api'
import { CypressAppRouterContext } from '@cypressUtils'
import { User } from '@interfaces'
import stores from '@stores'

import FluxFusion from './FluxFusion'

describe('FluxFusion', () => {
	const stubUseUserStore = (user: User) => {
		cy.stub(stores, 'useUserStore').returns({
			user: user,
			fetchUserData: cy.stub().as('fetchUserData')
		})
	}

	// Mock data for testing
	const mockUser = {
		_id: 'user123',
		username: 'testUser',
		inventory: [
			{ name: 'Basic Flux', _id: 'flux1', type: 'flux' },
			{ name: 'Basic Flux', _id: 'flux2', type: 'flux' },
			{ name: 'Standard Flux', _id: 'flux3', type: 'flux' },
			{ name: 'Premium Flux', _id: 'flux4', type: 'flux' }
		]
	} as User

	let setFluxFusion: any

	beforeEach(() => {
		setFluxFusion = cy.stub().as('setFluxFusion')

		cy.stub(stores, 'useItemsStore').returns({
			allItems: [
				{ name: 'Basic Flux', image: '/basic-flux.png', type: 'flux', _id: 'basicFlux' },
				{ name: 'Standard Flux', image: '/standard-flux.png', type: 'flux', _id: 'standardFlux' },
				{ name: 'Premium Flux', image: '/premium-flux.png', type: 'flux', _id: 'premiumFlux' },
				{ name: 'Ultimate Flux', image: '/ultimate-flux.png', type: 'flux', _id: 'ultimateFlux' }
			]
		})
	})

	it('renders the fusion panel with the correct number of flux options', () => {
		stubUseUserStore(mockUser)

		cy.mount(
			<CypressAppRouterContext>
				<FluxFusion setFluxFusion={setFluxFusion} />
			</CypressAppRouterContext>
		)

		// There should be 3 fusion options (from 4 flux types, minus 1)
		cy.getDataCy('flux-row').should('have.length', 3)
	})

	it('displays the correct flux counts from user inventory', () => {
		// Update mockUser to have multiple flux items
		stubUseUserStore({
			...mockUser,
			inventory: [
				...Array(12).fill({ name: 'Basic Flux', _id: 'flux1', type: 'flux' }),
				...Array(5).fill({ name: 'Standard Flux', _id: 'flux3', type: 'flux' }),
				...Array(2).fill({ name: 'Premium Flux', _id: 'flux4', type: 'flux' })
			]
		})

		cy.mount(
			<CypressAppRouterContext>
				<FluxFusion setFluxFusion={setFluxFusion} />
			</CypressAppRouterContext>
		)

		// Check that the counts are displayed correctly
		cy.getDataCy('current-flux').eq(0).contains('12')
		cy.getDataCy('current-flux').eq(1).contains('5')
		cy.getDataCy('current-flux').eq(2).contains('2')

		// Check fused flux counts too
		cy.getDataCy('fused-flux').eq(0).contains('5') // Standard
		cy.getDataCy('fused-flux').eq(1).contains('2') // Premium
		cy.getDataCy('fused-flux').eq(2).contains('0') // Ultimate
	})

	it('shows insufficient class when flux count is less than 10', () => {
		stubUseUserStore(mockUser)

		cy.mount(
			<CypressAppRouterContext>
				<FluxFusion setFluxFusion={setFluxFusion} />
			</CypressAppRouterContext>
		)

		// With our mock data, all flux types should show as insufficient
		cy.get('.count.insufficient').should('have.length', 3)

		// Arrows should be disabled
		cy.get('.flux-arrow.disabled').should('have.length', 3)
	})

	it('enables fusion when user has 10 or more of a flux type', () => {
		// Mock user with enough Basic Flux for fusion
		stubUseUserStore({
			...mockUser,
			inventory: [
				...Array(15).fill({ name: 'Basic Flux', _id: 'flux1', type: 'flux' }),
				...Array(3).fill({ name: 'Standard Flux', _id: 'flux3', type: 'flux' })
			]
		})

		cy.mount(
			<CypressAppRouterContext>
				<FluxFusion setFluxFusion={setFluxFusion} />
			</CypressAppRouterContext>
		)

		// First flux should not have insufficient class
		cy.getDataCy('flux-row').eq(0).find('.count.insufficient').should('not.exist')

		// First arrow should not be disabled
		cy.getDataCy('flux-row').eq(0).find('.flux-arrow.disabled').should('not.exist')

		// Other flux types should still be insufficient
		cy.getDataCy('flux-row').eq(1).find('.count.insufficient').should('exist')
		cy.getDataCy('flux-row').eq(2).find('.count.insufficient').should('exist')
	})

	it('calls API methods correctly when fusion is triggered', () => {
		// Mock user with enough Basic Flux for fusion
		stubUseUserStore({
			...mockUser,
			inventory: [
				...Array(15).fill({ name: 'Basic Flux', _id: 'flux1', type: 'flux' }),
				...Array(3).fill({ name: 'Standard Flux', _id: 'flux3', type: 'flux' })
			]
		})

		// Stub API methods
		cy.stub(api, 'removeItemFromInventory').as('removeItemFromInventory').resolves()
		cy.stub(api, 'addItemToInventory').as('addItemToInventory').resolves()

		cy.mount(
			<CypressAppRouterContext>
				<FluxFusion setFluxFusion={setFluxFusion} />
			</CypressAppRouterContext>
		)

		// Click the fusion arrow for Basic Flux
		cy.get('.flux-row').eq(0).find('.flux-arrow').click()

		// Verify API calls
		cy.get('@removeItemFromInventory').should('have.callCount', 10) // Should remove 10 Basic Flux
		cy.get('@addItemToInventory').should('have.been.calledOnce') // Should add 1 Standard Flux
		cy.get('@fetchUserData').should('have.been.calledWith', 'inventory') // Should update inventory
	})

	it('closes the flux fusion component when exit button is clicked', () => {
		stubUseUserStore(mockUser)

		cy.mount(
			<CypressAppRouterContext>
				<FluxFusion setFluxFusion={setFluxFusion} />
			</CypressAppRouterContext>
		)

		// Click the exit button
		cy.getDataCy('exit-btn').contains('Exit').click()

		// Verify setFluxFusion was called with false
		cy.get('@setFluxFusion').should('have.been.calledWith', false)
	})

	it('renders the correct flux item images', () => {
		stubUseUserStore(mockUser)

		cy.mount(
			<CypressAppRouterContext>
				<FluxFusion setFluxFusion={setFluxFusion} />
			</CypressAppRouterContext>
		)

		// Check that flux images are correctly displayed
		cy.getDataCy('current-flux').should('have.length', 3)
		cy.getDataCy('current-flux').eq(0).find('img').should('have.attr', 'src', '/basic-flux.png')
		cy.getDataCy('current-flux').eq(1).find('img').should('have.attr', 'src', '/standard-flux.png')
		cy.getDataCy('current-flux').eq(2).find('img').should('have.attr', 'src', '/premium-flux.png')

		cy.getDataCy('fused-flux').eq(0).find('img').should('have.attr', 'src', '/standard-flux.png')
		cy.getDataCy('fused-flux').eq(1).find('img').should('have.attr', 'src', '/premium-flux.png')
		cy.getDataCy('fused-flux').eq(2).find('img').should('have.attr', 'src', '/ultimate-flux.png')
	})
})
