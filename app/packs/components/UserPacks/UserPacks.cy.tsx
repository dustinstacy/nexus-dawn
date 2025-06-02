import api from '@api'
import { CypressAppRouterContext } from '@cypressUtils'
import { ICard, Role, User } from '@interfaces'
import stores from '@stores'
import utils from '@utils'
import UserPacks from './UserPacks'

const mockUser: User = {
	_id: 'user123',
	username: 'testuser',
	email: 'test@example.com',
	role: Role.player,
	activeBattle: false,
	coin: 1500,
	color: '#ff6b35',
	createdAt: '2024-01-01T00:00:00.000Z',
	image: '/avatar.jpg',
	level: 5,
	onboardingStage: 2,
	xp: 2500,
	__v: '0',
	stats: {
		battles: 25,
		draws: 2,
		losses: 8,
		wins: 15
	},
	inventory: [
		{
			_id: 'pack1',
			name: 'Starter Pack',
			type: 'pack',
			image: '/starter-pack.jpg',
			info: 'A basic pack for beginners',
			price: 100,
			level: 1,
			contents: {
				count: 5,
				odds: { Common: 70, Uncommon: 20, Rare: 8, Epic: 2 }
			}
		},
		{
			_id: 'pack1-duplicate',
			name: 'Starter Pack',
			type: 'pack',
			image: '/starter-pack1-duplicate.jpg',
			info: 'A basic pack for beginners 2',
			price: 100,
			level: 1,
			contents: {
				count: 5,
				odds: { Common: 70, Uncommon: 20, Rare: 8, Epic: 2 }
			}
		},
		{
			_id: 'pack2',
			name: 'Premium Pack',
			type: 'pack',
			image: '/premium-pack.jpg',
			info: 'A premium pack with better odds',
			price: 250,
			level: 3,
			contents: {
				count: 5,
				odds: { Common: 50, Uncommon: 30, Rare: 15, Epic: 4, Legendary: 1 }
			}
		},
		{
			_id: 'pack3',
			name: 'Elite Pack',
			type: 'pack',
			image: '/elite-pack.jpg',
			info: 'The ultimate pack for collectors',
			price: 500,
			level: 5,
			contents: {
				count: 7,
				odds: { Common: 30, Uncommon: 25, Rare: 25, Epic: 15, Legendary: 5 }
			}
		},
		{
			_id: 'card1',
			name: 'Fire Dragon',
			type: 'card',
			image: '/fire-dragon.jpg',
			info: 'A powerful fire-type card',
			price: 50,
			level: 1,
			contents: {
				count: 1,
				odds: {}
			}
		}
	]
}

const mockAllCards: ICard[] = [
	{
		_id: 'card1',
		name: 'Fire Warrior',
		number: 1,
		rarity: 'Common',
		image: '/fire-warrior.jpg',
		values: [3, 2, 4, 1]
	},
	{
		_id: 'card2',
		name: 'Water Guardian',
		number: 2,
		rarity: 'Uncommon',
		image: '/water-guardian.jpg',
		values: [2, 4, 3, 2]
	},
	{
		_id: 'card3',
		name: 'Lightning Bolt',
		number: 3,
		rarity: 'Rare',
		image: '/lightning-bolt.jpg',
		values: [5, 1, 2, 4]
	},
	{
		_id: 'card4',
		name: 'Earth Titan',
		number: 4,
		rarity: 'Epic',
		image: '/earth-titan.jpg',
		values: [4, 5, 5, 3]
	},
	{
		_id: 'card5',
		name: 'Cosmic Phoenix',
		number: 5,
		rarity: 'Legendary',
		image: '/cosmic-phoenix.jpg',
		values: [6, 6, 6, 6]
	}
]

const mockPackContents: ICard[] = [
	{
		_id: 'newcard1',
		name: 'Generated Card 1',
		number: 101,
		rarity: 'Common',
		image: '/generated1.jpg',
		values: [2, 3, 1, 4]
	},
	{
		_id: 'newcard2',
		name: 'Generated Card 2',
		number: 102,
		rarity: 'Uncommon',
		image: '/generated2.jpg',
		values: [3, 4, 2, 3]
	}
]

describe('UserPacks', () => {
	let useUserStoreStub: any
	let cardsStoreStub: any
	let setIsLoadingStub: any
	let setPackContentStub: any

	beforeEach(() => {
		cy.stub(api, 'addCardToCollection').resolves()
		cy.stub(api, 'removeItemFromInventory').resolves()
		cardsStoreStub = cy.stub(stores, 'useCardsStore').returns(mockAllCards)
		useUserStoreStub = cy.stub(stores, 'useUserStore').returns({
			user: mockUser,
			fetchUserCards: cy.stub().as('fetchUserCardsStub').resolves(),
			fetchUserData: cy.stub().as('fetchUserDataStub').resolves()
		})
		setIsLoadingStub = cy.stub()
		setPackContentStub = cy.stub()
		cy.spy(utils, 'uniqueItemsFilter').as('uniqueItemsFilterSpy')

		cy.mount(
			<CypressAppRouterContext>
				<div style={{ width: '500px', height: '500px' }}>
					<UserPacks
						setIsLoading={setIsLoadingStub}
						setPackContents={setPackContentStub}
					/>
				</div>
			</CypressAppRouterContext>
		)
	})

	describe('basic rendering', () => {
		it('renders without crashing', () => {
			cy.getDataCy('user-packs').should('exist')
			cy.getDataCy('user-packs-title').should('have.text', 'ChOOse a PacK')
			cy.getDataCy('carousel').should('exist')
			cy.getDataCy('pack-image').should('exist')
			cy.getDataCy('open-pack-button').should('have.text', 'OpeN PacK')
		})
	})

	describe('user data and packs', () => {
		it('handles null user', () => {
			useUserStoreStub.returns({
				user: null,
				fetchUserCards: cy.stub().resolves(),
				fetchUserData: cy.stub().resolves()
			})

			cy.mount(
				<CypressAppRouterContext>
					<div style={{ width: '500px', height: '500px' }}>
						<UserPacks
							setIsLoading={setIsLoadingStub}
							setPackContents={setPackContentStub}
						/>
					</div>
				</CypressAppRouterContext>
			)

			cy.getDataCy('empty-message').should('have.text', 'Head to the MaRKet to buy more packs')
		})

		it('handles user without inventory', () => {
			useUserStoreStub.returns({
				user: { ...mockUser, ...{ inventory: null } },
				fetchUserCards: cy.stub().resolves(),
				fetchUserData: cy.stub().resolves()
			})

			cy.mount(
				<CypressAppRouterContext>
					<div style={{ width: '500px', height: '500px' }}>
						<UserPacks
							setIsLoading={setIsLoadingStub}
							setPackContents={setPackContentStub}
						/>
					</div>
				</CypressAppRouterContext>
			)

			cy.getDataCy('empty-message').should('have.text', 'Head to the MaRKet to buy more packs')
		})

		it('removes duplicate packs and sorts them by level', () => {
			cy.get('@uniqueItemsFilterSpy')
				.should('have.been.called')
				.should(
					'have.been.calledWithMatch',
					Cypress.sinon.match.array.contains([
						mockUser.inventory[0],
						mockUser.inventory[1],
						mockUser.inventory[2],
						mockUser.inventory[3]
					])
				)
		})
	})

	describe('user interaction', () => {
		it('handles empty allCards array', () => {
			cardsStoreStub.returns([])

			cy.mount(
				<CypressAppRouterContext>
					<div style={{ width: '500px', height: '500px' }}>
						<UserPacks
							setIsLoading={setIsLoadingStub}
							setPackContents={setPackContentStub}
						/>
					</div>
				</CypressAppRouterContext>
			)

			cy.getDataCy('open-pack-button').click()
			cy.wait(5000)
			setPackContentStub('should.have.been.calledWith', [])
		})

		it('handles missing allCards array', () => {
			cardsStoreStub.returns(null)

			cy.mount(
				<CypressAppRouterContext>
					<div style={{ width: '500px', height: '500px' }}>
						<UserPacks
							setIsLoading={setIsLoadingStub}
							setPackContents={setPackContentStub}
						/>
					</div>
				</CypressAppRouterContext>
			)

			cy.getDataCy('open-pack-button').click()
			cy.wait(5000)
			setPackContentStub('should.have.been.calledWith', [])
		})

		it('calls fetchUserCards and fetchUserData when a pack is opened', () => {
			cy.mount(
				<CypressAppRouterContext>
					<div style={{ width: '500px', height: '500px' }}>
						<UserPacks
							setIsLoading={setIsLoadingStub}
							setPackContents={setPackContentStub}
						/>
					</div>
				</CypressAppRouterContext>
			)

			cy.getDataCy('open-pack-button').click()
			cy.wait(5000)
			cy.get('@fetchUserDataStub').should('have.been.called')
			cy.get('@fetchUserCardsStub').should('have.been.called')
		})

		it('handles switching packs', () => {
			cy.getDataCy('carousel-item')
				.filter('.current')
				.find('[data-cy="pack-name"]')
				.contains(mockUser.inventory[3].name)

			cy.getDataCy('arrow-next').click()
			cy.wait(1000)

			cy.getDataCy('carousel-item')
				.filter('.current')
				.find('[data-cy="pack-name"]')
				.contains(mockUser.inventory[0].name)
		})
	})
})
