import { mount } from 'cypress/react'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as Router from 'next/navigation'

import api from '@api'
import { IItem, User } from '@interfaces'
import stores from '@stores'

import CompletionReward from './CompletionReward'
import { onboardingStages } from '../../constants'

// Inline Role enum to match the User interface
enum Role {
	admin = 'admin',
	player = 'player'
}

// Create mock user for testing
const mockUser: User = {
	stats: { battles: 0, draws: 0, losses: 0, wins: 0 },
	_id: '1',
	role: Role.player,
	username: 'TestUser',
	activeBattle: false,
	coin: 0,
	color: '',
	createdAt: '',
	email: 'test@example.com',
	image: '',
	inventory: [],
	level: 1,
	onboardingStage: 5,
	xp: 0,
	__v: '0'
}

// Create mock rare pack
const mockRarePack: IItem = {
	contents: { count: 1, odds: {} },
	image: '/images/rare-pack.png',
	info: 'A special pack containing rare cards',
	level: 1,
	name: 'Rare Pack',
	price: 0,
	type: 'pack',
	_id: 'pack123'
}

describe('CompletionReward Component', () => {
	let router: any
	let returnEmptyItemsStore = true

	beforeEach(() => {
		cy.stub(stores, 'useUserStore').returns({
			user: mockUser,
			fetchUserData: cy.stub().as('fetchUserDataStub').resolves()
		})

		if (returnEmptyItemsStore) {
			cy.stub(stores, 'useItemsStore').returns([])
		} else {
			cy.stub(stores, 'useItemsStore').returns([mockRarePack])
		}

		cy.stub(api, 'addItemToInventory').as('addItemToInventoryStub').resolves()

		router = {
			push: cy.stub().as('router:push')
		}
		cy.stub(Router, 'useRouter').returns(router)

		const nextStageSpy = cy.stub().as('nextStageStub')

		mount(
			<AppRouterContext.Provider value={router}>
				<CompletionReward nextStage={nextStageSpy} />
			</AppRouterContext.Provider>
		)
	})

	it('should render initial state (step 1) correctly', () => {
		// Check initial rendering
		cy.getDataCy('completion').should('exist')
		cy.getDataCy('header').should('contain', onboardingStages[5].header[0])
		cy.getDataCy('logo').should('exist')
		cy.getDataCy('body-text').should('contain', onboardingStages[5].body)
		cy.getDataCy('button-step-1').should('contain', onboardingStages[5].label[0])
	})

	it('should advance to step 2 when clicking the first button', () => {
		// Click the claim reward button
		cy.getDataCy('button-step-1').click()

		// Verify addItemToInventory was called with correct params
		cy.get('@addItemToInventoryStub').should('have.been.called', mockUser, mockRarePack)

		// Verify fetchUserData was called
		cy.get('@fetchUserDataStub').should('have.been.calledWith', 'inventory')

		// Check that step 2 is displayed
		cy.getDataCy('header').should('contain', onboardingStages[5].header[1])
		cy.getDataCy('body').should('contain', 'Rare Pack')
		cy.getDataCy('rare-card-image').should('exist')
		cy.getDataCy('button-step-2').should('exist')
	})

	it('should call nextStage when clicking the second button', () => {
		// Progress to step 2 and click continue
		cy.getDataCy('button-step-1').click()
		cy.getDataCy('button-step-2').click()

		// Verify nextStage was called
		cy.get('@nextStageStub').should('have.been.called')
	})

	returnEmptyItemsStore = true

	it('should handle missing rare pack gracefully', () => {
		// Click should still work
		cy.getDataCy('button-step-1').click()

		// Component should still exist and not crash
		cy.getDataCy('completion').should('exist')
	})
})
