import { IItem, IOpponent, User } from '@interfaces'
import stores from '@stores'
import utils from '@utils'

import OpponentCard from './OpponentCard'
import { CypressAppRouterContext } from '../../../../cypress/support/utils'

describe('OpponentCard', () => {
	// Mock data for testing
	const mockRewardItem: IItem = {
		_id: 'item1',
		name: 'Basic Pack',
		image: '/basic-pack.jpg',
		info: 'A pack containing basic cards',
		price: 100,
		level: 1,
		type: 'pack',
		contents: {
			count: 5,
			odds: {
				Common: 80,
				Uncommon: 18,
				Rare: 2
			}
		}
	}

	const mockOpponent: IOpponent = {
		name: 'Test Opponent',
		avatar: '/avatar.jpg',
		image: '/opponent-image.jpg',
		color: '#9e0e24',
		level: 3,
		deckOdds: { Common: 80, Uncommon: 15, Rare: 5 },
		cardCount: 10,
		minPower: 100,
		maxPower: 200,
		rules: ['Best of 3'],
		rounds: 3,
		rewards: {
			xp: 100,
			coin: 200,
			items: [mockRewardItem]
		}
	}

	const mockSelectedOpponent: IOpponent = {
		...mockOpponent,
		name: 'Selected Opponent',
		level: 2
	}

	const mockUnlockedUser: User = {
		_id: 'user1',
		username: 'testuser',
		email: 'test@example.com',
		level: 5,
		xp: 1000,
		coin: 500,
		color: '#blue',
		image: '/user-avatar.jpg',
		role: 'player' as any,
		activeBattle: false,
		onboardingStage: 5,
		createdAt: '2023-01-01',
		__v: '1',
		inventory: [mockRewardItem],
		stats: {
			battles: 10,
			wins: 7,
			losses: 2,
			draws: 1
		}
	}

	const mockLockedUser: User = {
		...mockUnlockedUser,
		level: 1 // Lower level than opponent requirement
	}

	let setSelectedOpponentStub: Cypress.Agent<sinon.SinonStub>

	beforeEach(() => {
		setSelectedOpponentStub = cy.stub().as('setSelectedOpponentStub')
	})

	describe('Unlocked Opponent (User level >= Opponent level)', () => {
		beforeEach(() => {
			// Mock user store to return a user with sufficient level
			cy.stub(stores, 'useUserStore').callsFake((selector) => {
				return selector({ user: mockUnlockedUser })
			})

			// Mock utils.classSet function
			cy.stub(utils, 'classSet').callsFake((...classes) => {
				return classes.filter(Boolean).join(' ')
			})
		})

		it('renders an unlocked opponent card with correct content', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Check that the opponent card is rendered and clickable
			cy.getDataCy('opponent-card')
				.should('have.class', 'start-column')
				.should('not.have.class', 'locked')

			// Check that the opponent image is displayed
			cy.getDataCy('opponent-image')
				.should('have.attr', 'src', mockOpponent.avatar)
				.should('have.attr', 'alt', 'opponent image')

			// Check that the opponent name is displayed
			cy.getDataCy('name').should('contain.text', mockOpponent.name)
		})

		it('applies selected class when opponent is selected', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={mockOpponent}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Check that the selected class is applied
			cy.getDataCy('opponent-card').should('have.class', 'selected')
		})

		it('does not apply selected class when opponent is not selected', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={mockSelectedOpponent}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Check that the selected class is not applied
			cy.getDataCy('opponent-card').should('not.have.class', 'selected')
		})

		it('calls setSelectedOpponent when clicked', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Click on the opponent card
			cy.getDataCy('opponent-card').click()

			// Verify that setSelectedOpponent was called with the correct opponent
			cy.get('@setSelectedOpponentStub').should('have.been.calledWith', mockOpponent)
		})

		it('handles multiple clicks correctly', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Click multiple times
			cy.getDataCy('opponent-card').click().click()

			// Verify that setSelectedOpponent was called twice
			cy.get('@setSelectedOpponentStub').should('have.been.calledTwice')
		})
	})

	describe('Locked Opponent (User level < Opponent level)', () => {
		beforeEach(() => {
			// Mock user store to return a user with insufficient level
			cy.stub(stores, 'useUserStore').callsFake((selector) => {
				return selector({ user: mockLockedUser })
			})

			// Mock utils.classSet function
			cy.stub(utils, 'classSet').callsFake((...classes) => {
				return classes.filter(Boolean).join(' ')
			})
		})

		it('renders a locked opponent card when user level is insufficient', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Check that the locked opponent card is rendered
			cy.getDataCy('opponent-card')
				.should('have.class', 'locked')
				.should('have.class', 'center-column')

			// Check that it shows the level requirement
			cy.getDataCy('level-requirement').should('contain.text', '?')
			cy.getDataCy('opponent-card').should('contain.text', `Level ${mockOpponent.level}`)

			// Check that no image or name is displayed
			cy.getDataCy('opponent-image').should('not.exist')
			cy.getDataCy('name').should('not.exist')
		})

		it('does not call setSelectedOpponent when locked card is clicked', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Try to click on the locked opponent card
			cy.getDataCy('opponent-card').should('have.class', 'locked').click({ force: true })

			// Verify that setSelectedOpponent was not called
			cy.get('@setSelectedOpponentStub').should('not.have.been.called')
		})

		it('displays correct level requirement for different opponents', () => {
			const highLevelOpponent: IOpponent = {
				...mockOpponent,
				level: 10
			}

			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={highLevelOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Check that it shows the correct level requirement
			cy.getDataCy('opponent-card').should('contain.text', `Level ${highLevelOpponent.level}`)
		})
	})

	describe('Edge Cases', () => {
		beforeEach(() => {
			// Mock utils.classSet function
			cy.stub(utils, 'classSet').callsFake((...classes) => {
				return classes.filter(Boolean).join(' ')
			})
		})

		it('handles null user gracefully', () => {
			cy.stub(stores, 'useUserStore').callsFake((selector) => {
				return selector({ user: null })
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Should render as locked when user is null
			cy.getDataCy('opponent-card')
				.should('have.class', 'locked')
				.should('contain.text', `Level ${mockOpponent.level}`)
		})

		it('handles user with exact level requirement', () => {
			const exactLevelUser: User = {
				...mockUnlockedUser,
				level: mockOpponent.level // Exact same level as opponent
			}

			cy.stub(stores, 'useUserStore').callsFake((selector) => {
				return selector({ user: exactLevelUser })
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Should be unlocked when user level equals opponent level
			cy.getDataCy('opponent-card').should('not.have.class', 'locked')
			cy.getDataCy('opponent-image').should('exist')
			cy.getDataCy('name').should('contain.text', mockOpponent.name)
		})

		it('handles opponent with level 1', () => {
			const level1Opponent: IOpponent = {
				...mockOpponent,
				level: 1
			}

			cy.stub(stores, 'useUserStore').callsFake((selector) => {
				return selector({ user: mockUnlockedUser })
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={level1Opponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Should be unlocked for any user with level >= 1
			cy.getDataCy('opponent-card').should('not.have.class', 'locked')
			cy.getDataCy('opponent-image').should('exist')
		})

		it('handles different selected opponents correctly', () => {
			const anotherOpponent: IOpponent = {
				...mockOpponent,
				name: 'Another Opponent',
				level: 1
			}

			cy.stub(stores, 'useUserStore').callsFake((selector) => {
				return selector({ user: mockUnlockedUser })
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={anotherOpponent}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			// Should not have selected class when a different opponent is selected
			cy.getDataCy('opponent-card').should('not.have.class', 'selected')
		})
	})

	describe('Visual and Accessibility', () => {
		beforeEach(() => {
			cy.stub(stores, 'useUserStore').callsFake((selector) => {
				return selector({ user: mockUnlockedUser })
			})

			cy.stub(utils, 'classSet').callsFake((...classes) => {
				return classes.filter(Boolean).join(' ')
			})
		})

		it('has proper alt text for opponent image', () => {
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			cy.getDataCy('opponent-image').should('have.attr', 'alt', 'opponent image')
		})

		it('applies correct CSS classes based on selection state', () => {
			// Test unselected state
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={null}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			cy.getDataCy('opponent-card')
				.should('have.class', 'opponent-card')
				.should('have.class', 'start-column')
				.should('not.have.class', 'selected')

			// Remount with selected state
			cy.mount(
				<CypressAppRouterContext>
					<OpponentCard
						opponent={mockOpponent}
						selectedOpponent={mockOpponent}
						setSelectedOpponent={setSelectedOpponentStub}
					/>
				</CypressAppRouterContext>
			)

			cy.getDataCy('opponent-card')
				.should('have.class', 'opponent-card')
				.should('have.class', 'start-column')
				.should('have.class', 'selected')
		})
	})
})
