import { mount } from 'cypress/react'

import { ICard } from '@interfaces'

import CheckBox from './CheckBox'

describe('CheckBox Component', () => {
	const card: ICard = {
		selected: false
	} as ICard

	let mockOnClick: (card: ICard) => void

	beforeEach(() => {
		mockOnClick = cy.stub()
	})

	it('renders the unchecked checkbox when card is not selected', () => {
		mount(
			<CheckBox
				card={card}
				onClick={mockOnClick}
			/>
		)

		cy.get('[data-cy="checkbox"]').should('exist')
		cy.get('[data-cy="checkbox-unchecked"]').should('exist')
		cy.get('[data-cy="checkbox-checked"]').should('not.exist')
	})

	it('renders the checked checkbox when card is selected', () => {
		mount(
			<CheckBox
				card={{ ...card, selected: true }}
				onClick={mockOnClick}
			/>
		)

		cy.get('[data-cy="checkbox"]').should('exist')
		cy.get('[data-cy="checkbox-checked"]').should('exist')
		cy.get('[data-cy="checkbox-unchecked"]').should('not.exist')
	})

	it('calls onClick with the card when clicked', () => {
		mount(
			<CheckBox
				card={card}
				onClick={mockOnClick}
			/>
		)

		cy.get('[data-cy="checkbox"]')
			.click()
			.then(() => {
				expect(mockOnClick).to.have.been.calledOnceWith(card)
			})
	})

	it('applies the correct class when card is selected', () => {
		mount(
			<CheckBox
				card={{ ...card, selected: true }}
				onClick={mockOnClick}
			/>
		)

		cy.get('[data-cy="checkbox"]').should('have.class', 'checkbox checked')
	})

	it('applies the correct class when card is not selected', () => {
		mount(
			<CheckBox
				card={card}
				onClick={mockOnClick}
			/>
		)

		cy.get('[data-cy="checkbox"]').should('have.class', 'checkbox')
		cy.get('[data-cy="checkbox"]').should('not.have.class', 'checked')
	})
})
