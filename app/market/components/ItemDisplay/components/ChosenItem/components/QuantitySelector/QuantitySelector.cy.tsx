import { ChosenQuantity, IItem } from '@interfaces'

import QuantitySelector from './QuantitySelector'

describe('QuantitySelector', () => {
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
	let chosenQuantity: ChosenQuantity = { amount: 1, discount: '0' }
	let setChosenQuantity: any

	beforeEach(() => {
		// Reset the chosen quantity before each test
		chosenQuantity = { amount: 1, discount: '0' }
		setChosenQuantity = cy.stub().as('setChosenQuantityStub')
	})

	it('renders the component with the title', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={mockItem}
				chosenQuantity={chosenQuantity}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		cy.getDataCy('heading').contains('ChOOse Quantity :').should('be.visible')
	})

	it('displays all three quantity options', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={mockItem}
				chosenQuantity={chosenQuantity}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		cy.get('[data-cy^="quantity-button-"]').should('have.length', 3)
		cy.getDataCy('quantity-button-1').should('contain', '1')
		cy.getDataCy('quantity-button-5').should('contain', '5')
		cy.getDataCy('quantity-button-10').should('contain', '10')
	})

	it('highlights the 1st quantity button', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={mockItem}
				chosenQuantity={chosenQuantity}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		// Default selection should be quantity 1
		cy.getDataCy('quantity-button-1').should('contain', '1').should('have.class', 'chosen')
	})

	it('highlights the 2nd quantity button', () => {
		const newMockItem: IItem = { ...mockItem, contents: { ...mockItem.contents, count: 5 } }
		const newChosenQuantity = { amount: 5, discount: '10%' }

		cy.mount(
			<QuantitySelector
				chosenItem={newMockItem}
				chosenQuantity={newChosenQuantity}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		// Default selection should be quantity 1
		cy.getDataCy('quantity-button-5').should('contain', '5').should('have.class', 'chosen')
	})

	it('highlights the 3rd quantity button', () => {
		const newMockItem: IItem = { ...mockItem, contents: { ...mockItem.contents, count: 10 } }
		const newChosenQuantity = { amount: 10, discount: '15%' }

		cy.mount(
			<QuantitySelector
				chosenItem={newMockItem}
				chosenQuantity={newChosenQuantity}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		// Default selection should be quantity 1
		cy.getDataCy('quantity-button-10').should('contain', '10').should('have.class', 'chosen')
	})

	it('shows no discount for quantity 1', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={mockItem}
				chosenQuantity={{ amount: 1, discount: '0' }}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		cy.getDataCy('discount').should('be.empty')
	})

	it('shows 10% discount for quantity 5', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={mockItem}
				chosenQuantity={{ amount: 5, discount: '10%' }}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		cy.getDataCy('discount').should('contain', '10% Discount')
	})

	it('shows 15% discount for quantity 10', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={mockItem}
				chosenQuantity={{ amount: 10, discount: '15%' }}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		cy.getDataCy('discount').should('contain', '15% Discount')
	})

	it('handles null chosen item gracefully', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={null}
				chosenQuantity={chosenQuantity}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		// Component should still render without errors
		cy.contains('ChOOse Quantity :').should('be.visible')
		cy.get('[data-cy^="quantity-button-"]').should('have.length', 3)
	})

	it('applies correct CSS classes to buttons', () => {
		cy.mount(
			<QuantitySelector
				chosenItem={mockItem}
				chosenQuantity={{ amount: 5, discount: '10%' }}
				setChosenQuantity={setChosenQuantity}
			/>
		)

		// Quantity 1 button should not have 'chosen' class
		cy.getDataCy('quantity-button-1').should('not.have.class', 'chosen')

		// Quantity 5 button should have 'chosen' class
		cy.getDataCy('quantity-button-5').should('have.class', 'chosen')

		// Quantity 10 button should not have 'chosen' class
		cy.getDataCy('quantity-button-10').should('not.have.class', 'chosen')
	})
})
