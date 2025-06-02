import Alert from './Alert'

describe('<Alert />', () => {
	it('renders the Alert component with children', () => {
		const testMessage = 'This is a test alert message.'

		// Mount the Alert component
		cy.mount(
			<Alert>
				<p>{testMessage}</p>
			</Alert>
		)

		cy.getDataCy('modal-overlay').should('exist')
		cy.get('.alert.box.center-column').should('exist')
		cy.contains('⚠️').should('be.visible')
		cy.contains(testMessage).should('be.visible')
	})
})
