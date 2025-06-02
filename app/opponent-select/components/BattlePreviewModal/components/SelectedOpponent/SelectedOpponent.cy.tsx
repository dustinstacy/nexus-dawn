import { headerStyle } from '@assets'
import { IItem, IOpponent } from '@interfaces'
import stores from '@stores'

import SelectedOpponent from './SelectedOpponent'

describe('SelectedOpponent', () => {
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
			items: [
				{
					name: 'Basic Pack',
					_id: 'mockItem1',
					contents: {
						count: 5,
						odds: {
							Common: 80,
							Uncommon: 18,
							Rare: 2
						}
					},
					image: '',
					info: '',
					level: 0,
					price: 0,
					type: ''
				}
			]
		}
	}

	const mockSingleRoundOpponent: IOpponent = {
		...mockOpponent,
		name: 'Single Round Opponent',
		rounds: 1,
		rules: ['Single Round']
	}

	const mockAllItems = [mockRewardItem]
	let useItemsStoreStub: any

	beforeEach(() => {
		// Stub the items store
		useItemsStoreStub = cy.stub(stores, 'useItemsStore').returns(mockAllItems)

		// Mock the headerStyle image
		cy.stub(headerStyle, 'src').value('/header-style.png')
	})

	it('renders the opponent name correctly', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		cy.getDataCy('opponent-name').should('contain', mockOpponent.name)
	})

	it('displays the opponent image', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		cy.getDataCy('opponent-image')
			.should('have.attr', 'src', mockOpponent.image)
			.should('have.attr', 'alt', 'opponent image')
	})

	it('shows the average power calculation', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		// Average power should be (minPower + maxPower) / 2 = (100 + 200) / 2 = 150
		cy.getDataCy('power-attribute-value').should(
			'contain',
			(mockOpponent.minPower + mockOpponent.maxPower) / 2
		)
	})

	it('displays rules correctly', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		// Should show the rules array content
		cy.getDataCy('rules-attribute-value').should(
			'contain',
			`${mockOpponent.rules[0]}${mockOpponent.rules[1]}`
		)

		// Should display the number of rounds with plural 's'
		cy.getDataCy('rules-attribute-value').should('contain', `${mockOpponent.rounds} Rounds`)
	})

	it('handles single round display correctly', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockSingleRoundOpponent} />)

		// Should display without plural 's'
		cy.getDataCy('rules-attribute-value')
			.should('contain', '1 Round')
			.should('not.contain', 'Rounds')
	})

	it('displays reward items correctly', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		// Should display the reward item image
		cy.getDataCy('reward-item-image')
			.should('have.attr', 'src', '/basic-pack.jpg')
			.should('have.attr', 'alt', 'item image')
	})

	it('filters and finds the correct reward items', () => {
		// Add a spy to verify the filter logic
		const filterSpy = cy.spy().as('filterSpy')

		cy.stub(Array.prototype, 'filter').callsFake(function (callback) {
			const result = callback(mockRewardItem)

			filterSpy(result)

			return result ? [mockRewardItem] : []
		})

		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		// Verify the filter was called with the correct name match
		cy.get('@filterSpy').should('have.been.called')

		// Should show the filtered reward item
		cy.getDataCy('reward-item-image').should('exist')
	})

	it('displays header styles in all attributes', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		// Check each section has the header style image
		cy.getDataCy('power-attribute-header-style-image')
			.should('have.attr', 'src', '/header-style.png')
			.should('have.attr', 'alt', 'header style')

		cy.getDataCy('rules-attribute-header-style-image')
			.should('have.attr', 'src', '/header-style.png')
			.should('have.attr', 'alt', 'header style')

		cy.getDataCy('rewards-attribute-header-style-image')
			.should('have.attr', 'src', '/header-style.png')
			.should('have.attr', 'alt', 'header style')
	})

	it('renders all three attribute sections', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		cy.getDataCy('power-attribute').should('exist')
		cy.getDataCy('rules-attribute').should('exist')
		cy.getDataCy('rewards-attribute').should('exist')
	})

	it('displays attribute headers correctly', () => {
		cy.mount(<SelectedOpponent selectedOpponent={mockOpponent} />)

		cy.getDataCy('power-attribute-header').should('contain', 'POWER')
		cy.getDataCy('rules-attribute-header').should('contain', 'Rules')
		cy.getDataCy('rewards-attribute-header').should('contain', 'Drops')
	})

	it('handles opponents with no reward items', () => {
		const noRewardsOpponent = {
			...mockOpponent,
			rewards: {
				...mockOpponent.rewards,
				items: []
			}
		}

		cy.mount(<SelectedOpponent selectedOpponent={noRewardsOpponent} />)

		// Should show the rewards section but with no items
		cy.getDataCy('rewards-attribute').should('exist')
		cy.getDataCy('reward-item-image').should('not.exist')
	})

	it('handles multiple reward items correctly', () => {
		// Create additional mock item
		const additionalItem: IItem = {
			...mockRewardItem,
			_id: 'item2',
			name: 'Basic Pack',
			image: '/basic-pack.jpg'
		}

		// Update the opponent with multiple rewards
		const multiRewardOpponent = {
			...mockOpponent,
			rewards: {
				...mockOpponent.rewards,
				items: [mockRewardItem, additionalItem]
			}
		}

		// Update the allItems array
		useItemsStoreStub.restore()
		cy.stub(stores, 'useItemsStore').returns([mockRewardItem, additionalItem])

		cy.mount(<SelectedOpponent selectedOpponent={multiRewardOpponent} />)

		// Should show multiple reward items
		cy.getDataCy('reward-item-image').should('have.length', 2)
	})
})
