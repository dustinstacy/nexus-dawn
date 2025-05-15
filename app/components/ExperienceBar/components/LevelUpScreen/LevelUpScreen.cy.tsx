import { mount } from 'cypress/react'

import useItemsStore from 'app/stores/useItemsStore'
import useOpponentsStore from 'app/stores/useOpponentsStore'
import useUserStore from 'app/stores/useUserStore'

import LevelUpScreen from './LevelUpScreen'

describe('LevelUpScreen Component', () => {
	beforeEach(() => {
		useUserStore.setState({
			// @ts-expect-error only include data used in the component
			user: { level: 5 }
		})

		useItemsStore.setState({
			allItems: [
				// @ts-expect-error only include data used in the component
				{ level: 1, image: 'item1.png', name: 'Item 1' },
				// @ts-expect-error only include data used in the component
				{ level: 2, image: 'item2.png', name: 'Item 2' },
				// @ts-expect-error only include data used in the component
				{ level: 3, image: 'item3.png', name: 'Item 3' },
				// @ts-expect-error only include data used in the component
				{ level: 4, image: 'item4.png', name: 'Item 4' },
				// @ts-expect-error only include data used in the component
				{ level: 5, image: 'item5.png', name: 'Item 5' }
			]
		})

		useOpponentsStore.setState({
			allOpponents: [
				// @ts-expect-error only include data used in the component
				{ level: 1, image: 'opponent1.png', name: 'Opponent 1' },
				// @ts-expect-error only include data used in the component
				{ level: 2, image: 'opponent2.png', name: 'Opponent 2' },
				// @ts-expect-error only include data used in the component
				{ level: 3, image: 'opponent3.png', name: 'Opponent 3' },
				// @ts-expect-error only include data used in the component
				{ level: 4, image: 'opponent4.png', name: 'Opponent 4' },
				// @ts-expect-error only include data used in the component
				{ level: 5, image: 'opponent5.png', name: 'Opponent 5' }
			]
		})
	})

	it('renders the level up screen with correct level information', () => {
		const setNewLevelAlert = cy.stub()
		mount(<LevelUpScreen setNewLevelAlert={setNewLevelAlert} />)

		cy.getDataCy('level-up').should('exist')
		cy.getDataCy('prev-level').should('contain', '4')
		cy.getDataCy('new-level').should('contain', '5')
	})

	it('renders new market item and opponent unlocks for levels below 10', () => {
		const setNewLevelAlert = cy.stub()
		mount(<LevelUpScreen setNewLevelAlert={setNewLevelAlert} />)

		cy.getDataCy('level-up-unlocks').find('[data-cy="market-item-unlock"]').should('exist')
		cy.getDataCy('market-item-title').should('contain', 'New Market Item Available')
		cy.getDataCy('market-item-image').should('have.attr', 'src', 'item5.png')
		cy.getDataCy('opponent-title').should('contain', 'New Opponent Unlocked')
		cy.getDataCy('opponent-image').should('have.attr', 'src', 'opponent5.png')
	})

	it('renders level rewards with correct coin amount', () => {
		const setNewLevelAlert = cy.stub()
		mount(<LevelUpScreen setNewLevelAlert={setNewLevelAlert} />)

		cy.getDataCy('coin-reward-amount').should('contain', '750')
		cy.getDataCy('coin-reward-image').should('have.attr', 'alt', 'coin-image')
	})

	it('closes the modal when the close button is clicked', () => {
		const setNewLevelAlert = cy.stub()
		mount(<LevelUpScreen setNewLevelAlert={setNewLevelAlert} />)

		cy.wait(5000)

		cy.getDataCy('close-modal')
			.click()
			.then(() => {
				expect(setNewLevelAlert).to.have.been.calledOnceWith(false)
			})
	})
})
