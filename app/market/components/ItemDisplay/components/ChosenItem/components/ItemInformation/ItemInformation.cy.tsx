import { IItem, User } from '@interfaces'
import stores from '@stores'

import ItemInformation from './ItemInformation'

describe('ItemInformation', () => {
	// Mock data for testing
	const mockBasicItem: IItem = {
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

	const mockSimpleItem: IItem = {
		_id: 'item2',
		name: 'Health Potion',
		image: '/health-potion.jpg',
		info: 'Restores 20 health points',
		price: 50,
		level: 1,
		type: 'consumable',
		contents: {
			count: 1,
			odds: null
		}
	}

	const mockUser = {
		_id: 'user1',
		username: 'testUser',
		inventory: [
			{ name: 'Basic Pack', _id: 'inv1', type: 'pack' },
			{ name: 'Basic Pack', _id: 'inv2', type: 'pack' },
			{ name: 'Health Potion', _id: 'inv3', type: 'consumable' }
		]
	} as User

	const stubUseUserStore = (user: User | null) => {
		cy.stub(stores, 'useUserStore').returns(user)
	}

	it('renders item image correctly', () => {
		stubUseUserStore(mockUser)

		cy.mount(<ItemInformation chosenItem={mockBasicItem} />)

		cy.getDataCy('item-image')
			.should('have.attr', 'src', mockBasicItem.image)
			.should('have.attr', 'alt', mockBasicItem.name)
	})

	it('displays item name and description', () => {
		stubUseUserStore(mockUser)
		cy.mount(<ItemInformation chosenItem={mockBasicItem} />)

		cy.getDataCy('item-name').should('contain', mockBasicItem.name)
		cy.getDataCy('item-desc').should('contain', mockBasicItem.info)
	})

	it('shows the correct owned quantity from user inventory', () => {
		stubUseUserStore(mockUser)
		cy.mount(<ItemInformation chosenItem={mockBasicItem} />)

		// User has 2 Basic Packs
		cy.getDataCy('owned-inventory').should('contain', '2')

		// Mount with a different item
		cy.mount(<ItemInformation chosenItem={mockSimpleItem} />)

		// User has 1 Health Potion
		cy.getDataCy('owned-inventory').should('contain', '1')
	})

	it('displays odds section when item has odds', () => {
		stubUseUserStore(mockUser)
		cy.mount(<ItemInformation chosenItem={mockBasicItem} />)

		// Should show the odds section
		cy.getDataCy('item-odds').should('exist')
		cy.getDataCy('item-odds').should('contain', 'Odds:')

		// Check each rarity odds is displayed
		cy.getDataCy('item-odds').should('contain', 'Common', '80 %')
		cy.getDataCy('item-odds').should('contain', 'Uncommon', '18 %')
		cy.getDataCy('item-odds').should('contain', 'Rare', '2 %')
	})

	it('does not display odds section when item has no odds', () => {
		stubUseUserStore(mockUser)
		cy.mount(<ItemInformation chosenItem={mockSimpleItem} />)

		// Should not show the odds section
		cy.getDataCy('item-odds').should('not.exist')
	})

	it('handles null or undefined chosen item gracefully', () => {
		stubUseUserStore(mockUser)
		// @ts-expect-error - Testing with undefined item
		cy.mount(<ItemInformation chosenItem={undefined} />)

		// Should not crash, but might show empty content
		cy.getDataCy('item-info').should('exist')
	})

	it('shows zero owned items when user has none in inventory', () => {
		const mockItemNotOwned: IItem = {
			_id: 'item3',
			name: 'Rare Pack',
			image: '/rare-pack.jpg',
			info: 'A pack containing rare cards',
			price: 500,
			level: 3,
			type: 'pack',
			contents: {
				count: 5,
				odds: {
					Uncommon: 60,
					Rare: 35,
					Epic: 5
				}
			}
		}

		stubUseUserStore(mockUser)

		cy.mount(<ItemInformation chosenItem={mockItemNotOwned} />)

		// User has 0 Rare Packs
		cy.getDataCy('owned-inventory').should('contain', '0')
	})

	it('handles items with empty or missing info field', () => {
		const mockItemNoInfo: IItem = {
			_id: 'item4',
			name: 'Mystery Box',
			image: '/mystery-box.jpg',
			info: '',
			price: 200,
			level: 2,
			type: 'pack',
			contents: {
				count: 3,
				odds: {
					Common: 50,
					Uncommon: 50
				}
			}
		}

		stubUseUserStore(mockUser)

		cy.mount(<ItemInformation chosenItem={mockItemNoInfo} />)

		cy.getDataCy('item-name').should('contain', 'Mystery Box')
		cy.getDataCy('item-desc').should('be.empty')
	})

	it('displays correct number of odds entries', () => {
		stubUseUserStore(mockUser)

		cy.mount(<ItemInformation chosenItem={mockBasicItem} />)

		// Should have 3 odds entries (Common, Uncommon, Rare)
		cy.get('.item-odds > div').should('have.length', 3)

		const mockItemWithDifferentOdds: IItem = {
			_id: 'item5',
			name: 'Premium Pack',
			image: '/premium-pack.jpg',
			info: 'A premium pack with better odds',
			price: 300,
			level: 2,
			type: 'pack',
			contents: {
				count: 5,
				odds: {
					Common: 40,
					Uncommon: 40,
					Rare: 15,
					Epic: 5
				}
			}
		}

		cy.mount(<ItemInformation chosenItem={mockItemWithDifferentOdds} />)

		// Should have 4 odds entries
		cy.get('.item-odds > div').should('have.length', 4)
	})

	it('renders correctly when user is not logged in', () => {
		stubUseUserStore(null)

		cy.mount(<ItemInformation chosenItem={mockBasicItem} />)

		// Should still render the item information
		cy.getDataCy('item-name').should('exist')
		cy.getDataCy('item-desc').should('exist')

		// Owned count should either show 0 or handle the null case gracefully
		cy.getDataCy('owned-inventory').should('exist')
	})
})
