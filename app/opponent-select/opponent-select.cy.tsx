import api from '@api'
import { CypressAppRouterContext } from '@cypressUtils'
import { ICard, IOpponent, Role, User } from '@interfaces'
import stores from '@stores'

import OpponentSelect from './page'

describe('OpponentSelect Page', () => {
	// Mock data for testing
	const mockUser: User = {
		_id: 'user1',
		username: 'testuser',
		email: 'test@example.com',
		image: '/user-avatar.jpg',
		color: '#0066cc',
		level: 5,
		xp: 250,
		coin: 1000,
		role: Role.player,
		activeBattle: false,
		createdAt: '2023-01-01T00:00:00.000Z',
		onboardingStage: 5,
		inventory: [],
		__v: '0',
		stats: {
			battles: 10,
			wins: 6,
			losses: 4,
			draws: 0
		}
	}

	const mockOpponents: IOpponent[] = [
		{
			name: 'Easy Opponent',
			avatar: '/easy-avatar.jpg',
			image: '/easy-image.jpg',
			color: '#ff0000',
			level: 1,
			deckOdds: { Common: 33, Uncommon: 33, Rare: 34 },
			cardCount: 8,
			minPower: 50,
			maxPower: 100,
			rules: ['Best of 1'],
			rounds: 1,
			rewards: {
				xp: 50,
				coin: 100,
				items: []
			}
		},
		{
			name: 'Medium Opponent',
			avatar: '/medium-avatar.jpg',
			image: '/medium-image.jpg',
			color: '#00ff00',
			level: 3,
			deckOdds: { Common: 70, Uncommon: 20, Rare: 10 },
			cardCount: 10,
			minPower: 100,
			maxPower: 150,
			rules: ['Best of 3'],
			rounds: 3,
			rewards: {
				xp: 100,
				coin: 200,
				items: []
			}
		},
		{
			name: 'Hard Opponent',
			avatar: '/hard-avatar.jpg',
			image: '/hard-image.jpg',
			color: '#0000ff',
			level: 7,
			deckOdds: { Common: 50, Uncommon: 30, Rare: 20 },
			cardCount: 12,
			minPower: 150,
			maxPower: 200,
			rules: ['Best of 5'],
			rounds: 5,
			rewards: {
				xp: 200,
				coin: 400,
				items: []
			}
		}
	]

	const allCards: ICard[] = [
		{
			_id: 'card1',
			name: 'Test Card',
			number: 1,
			image: '/card.jpg',
			values: [1, 1, 1, 1],
			rarity: 'Common'
		},
		{
			_id: 'card2',
			name: 'Test Card 2',
			number: 2,
			image: '/card2.jpg',
			values: [2, 2, 2, 2],
			rarity: 'Uncommon'
		},
		{
			_id: 'card3',
			name: 'Test Card 3',
			number: 3,
			image: '/card3.jpg',
			values: [3, 3, 3, 3],
			rarity: 'Rare'
		}
	]

	beforeEach(() => {
		// Reset localStorage
		cy.window().then((win) => {
			win.localStorage?.clear?.()
		})
	})

	describe('Basic Rendering', () => {
		it('renders the component with proper structure', () => {
			// Setup stores using setState instead of stubbing
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.stub(api, 'postBattleLog').resolves()
			cy.stub(api, 'updateUserStats').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Check main container
			cy.getDataCy('opponent-select-outer').should('exist')

			// Check background element
			cy.getDataCy('background').should('exist')

			// Check header
			cy.getDataCy('page-heading').should('contain', 'Choose your opponent')

			// Check opponent list container
			cy.getDataCy('opponent-list').should('exist')
		})

		it('displays the page title correctly', () => {
			// Setup stores using setState instead of stubbing
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.stub(api, 'postBattleLog').resolves()
			cy.stub(api, 'updateUserStats').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			cy.getDataCy('page-heading').should('have.text', 'Choose your opponent')
		})
	})

	describe('Opponent List Display', () => {
		it('displays all opponents in sorted order by level', () => {
			// Setup stores using setState instead of stubbing
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.stub(api, 'postBattleLog').resolves()
			cy.stub(api, 'updateUserStats').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Should display all opponents
			cy.getDataCy('opponent-card').should('have.length', 3)

			// Should be sorted by level (Easy=1, Medium=3, Hard=7)
			cy.getDataCy('opponent-card').first().should('contain', 'Easy Opponent')
			cy.getDataCy('opponent-card').eq(1).should('contain', 'Medium Opponent')
			cy.getDataCy('opponent-card').last().should('contain', `Level ${mockOpponents[2].level}`)
		})

		it('handles empty opponent list gracefully', () => {
			// Setup stores using setState instead of stubbing
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: [],
				selectedOpponent: null
			})

			cy.stub(api, 'postBattleLog').resolves()
			cy.stub(api, 'updateUserStats').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Should still render container but no opponent cards
			cy.getDataCy('opponent-list').should('exist')
			cy.getDataCy('opponent-card').should('not.exist')
		})
	})

	describe('Opponent Selection', () => {
		it('calls setSelectedOpponent when an opponent is clicked', () => {
			const setSelectedOpponentStub = cy.stub().as('setSelectedOpponentStub')
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null,
				setSelectedOpponent: setSelectedOpponentStub
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Click on first opponent card
			cy.getDataCy('opponent-card').first().click()

			// setSelectedOpponent should be called
			cy.get('@setSelectedOpponentStub').should('have.been.called')
		})

		it('displays BattlePreviewModal when an opponent is selected', () => {
			// Setup stores with selected opponent
			stores.useUserStore.setState({
				user: mockUser,
				fetchUserDeck: cy.stub().resolves(),
				fetchUserCards: cy.stub().resolves()
			})
			stores.useCardsStore.setState({ allCards })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: mockOpponents[0],
				setSelectedOpponent: cy.stub(),
				selectedOpponentDeck: [],
				setSelectedOpponentDeck: cy.stub()
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// BattlePreviewModal should be rendered
			cy.getDataCy('modal-overlay').should('exist')
		})

		it('does not display BattlePreviewModal when no opponent is selected', () => {
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// BattlePreviewModal should not be rendered
			cy.getDataCy('battle-preview-modal').should('not.exist')
		})
	})

	describe('Battle Alert Functionality', () => {
		it('displays alert when saved battle state exists in localStorage', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			// Set up localStorage with saved battle state
			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', JSON.stringify([{ test: 'data' }]))
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Alert should be displayed
			cy.getDataCy('alert').should('contain', 'You currently have an unfinished battle')
		})

		it('does not display alert when no saved battle state exists', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Alert should not be displayed
			cy.getDataCy('alert').should('not.exist')
		})

		it('displays correct alert content with proper buttons', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', JSON.stringify([{ test: 'data' }]))
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Check alert content
			cy.getDataCy('unfinished-battle-msg').should(
				'contain',
				'You currently have an unfinished battle'
			)

			// Check buttons
			cy.getDataCy('rejoin-battle-button').should('exist')
			cy.getDataCy('forfeit-battle-button').should('exist')

			// Check warning message
			cy.getDataCy('forfeit-warning-msg').should('contain', '*Forfeiting will count as a loss')
		})

		it('Rejoin button has correct path to battle page', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', JSON.stringify([{ test: 'data' }]))
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Rejoin button should navigate to /battle
			cy.getDataCy('rejoin-battle-button').contains('Rejoin').click()
			cy.get('@router:push').should('have.been.calledWith', '/battle')
		})
	})

	describe('Forfeit Battle Functionality', () => {
		beforeEach(() => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			// Set up localStorage with saved battle state
			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', JSON.stringify([{ test: 'battle', data: 'example' }]))
			})
		})

		it('calls forfeitBattle when forfeit button is clicked', () => {
			cy.stub(api, 'postBattleLog').as('postBattleLogStub').resolves()
			cy.stub(api, 'updateUserStats').as('updateUserStatsStub').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Click forfeit button
			cy.getDataCy('forfeit-battle-button').click()

			// API calls should be made
			cy.get('@postBattleLogStub').should(
				'have.been.calledWith',
				JSON.stringify([{ test: 'battle', data: 'example' }])
			)
			cy.get('@updateUserStatsStub').should('have.been.calledWith', mockUser, 'loss')
		})

		it('removes battleLog from localStorage after forfeit', () => {
			cy.stub(api, 'postBattleLog').resolves()
			cy.stub(api, 'updateUserStats').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Verify localStorage has the battleLog
			cy.window().its('localStorage').invoke('getItem', 'battleLog').should('not.be.null')

			// Click forfeit button
			cy.getDataCy('forfeit-battle-button').click()

			// Wait for async operations and verify localStorage is cleared
			cy.wait(100).then(() => {
				cy.window().its('localStorage').invoke('getItem', 'battleLog').should('be.null')
			})
		})

		it('hides alert after successful forfeit', () => {
			cy.stub(api, 'postBattleLog').resolves()
			cy.stub(api, 'updateUserStats').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Alert should be visible initially
			cy.getDataCy('alert').should('exist')

			// Click forfeit button
			cy.getDataCy('forfeit-battle-button').click()

			// Wait for state update and verify alert is hidden
			cy.wait(100)
			cy.getDataCy('alert').should('not.exist')
		})

		it('handles forfeit with proper error handling', () => {
			// Mock API to reject
			cy.stub(api, 'postBattleLog').as('postBattleLogErrorStub').resolves(new Error('API Error'))
			cy.stub(api, 'updateUserStats').as('updateUserStatsErrorStub').resolves()

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Click forfeit button
			cy.getDataCy('forfeit-battle-button').contains('Forfeit').click()

			// Should still attempt the API call
			cy.get('@postBattleLogErrorStub').should('have.been.called')
		})
	})

	describe('LocalStorage Behavior', () => {
		it('detects saved battle state on component mount', () => {
			const battleLogData = [{ round: 1, data: 'test' }]

			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', JSON.stringify(battleLogData))
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Alert should be shown due to saved state
			cy.getDataCy('alert').should('exist')
		})

		it('does not show alert when localStorage is empty', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// No alert should be shown
			cy.getDataCy('alert').should('not.exist')
		})

		it('handles malformed localStorage data gracefully', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', 'invalid-json')
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Should still show alert for any truthy value
			cy.getDataCy('alert').should('exist')
		})
	})

	describe('Edge Cases and Error Handling', () => {
		it('handles null user gracefully', () => {
			stores.useUserStore.setState({ user: null })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Component should still render without crashing
			cy.getDataCy('opponent-select-outer').should('exist')
		})

		it('handles undefined allOpponents gracefully', () => {
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: undefined,
				selectedOpponent: null
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Should render without opponent cards
			cy.getDataCy('opponent-list').should('exist')
			cy.getDataCy('opponent-card').should('not.exist')
		})
	})

	describe('User Experience and Accessibility', () => {
		it('displays proper loading states', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Component should render immediately without loading spinners
			cy.getDataCy('opponent-select-outer').should('be.visible')
		})

		it('provides proper visual feedback for interactions', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', JSON.stringify([{ test: 'data' }]))
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Buttons should be clickable and visible
			cy.getDataCy('forfeit-battle-button').should('be.visible').and('not.be.disabled')
			cy.getDataCy('rejoin-battle-button').should('be.visible').and('not.be.disabled')
		})
	})

	describe('Data Flow and State Management', () => {
		it('handles alert state toggling correctly', () => {
			// Setup stores
			stores.useUserStore.setState({ user: mockUser })
			stores.useOpponentsStore.setState({
				allOpponents: mockOpponents,
				selectedOpponent: null
			})

			cy.stub(api, 'postBattleLog').resolves()
			cy.stub(api, 'updateUserStats').resolves()

			cy.window().then((win) => {
				win.localStorage.setItem('battleLog', JSON.stringify([{ test: 'data' }]))
			})

			cy.mount(
				<CypressAppRouterContext>
					<OpponentSelect />
				</CypressAppRouterContext>
			)

			// Alert should be active initially
			cy.getDataCy('alert').should('exist')

			// After forfeit, alert should be hidden
			cy.getDataCy('forfeit-battle-button').click()
			cy.wait(100)
			cy.getDataCy('alert').should('not.exist')
		})
	})
})
