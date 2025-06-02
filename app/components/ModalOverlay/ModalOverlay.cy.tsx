import { mount } from 'cypress/react'

import ModalOverlay from './ModalOverlay'

describe('ModalOverlay Component', () => {
	it('renders the modal overlay with children', () => {
		const TestComponent = () => <div data-cy="test-component">Test Component</div>

		mount(
			<ModalOverlay>
				<TestComponent />
			</ModalOverlay>
		)

		cy.getDataCy('modal-overlay').should('exist')
		cy.getDataCy('test-component').should('exist')
	})
})
