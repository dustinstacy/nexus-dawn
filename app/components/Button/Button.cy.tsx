import { CypressAppRouterContext } from '@cypressUtils'

import Button from './Button'

describe('<Button />', () => {
	it('renders the Button component with the correct label', () => {
		const label = 'Click Me'

		// Mount the Button component
		cy.mount(
			<CypressAppRouterContext>
				<Button label={label} />
			</CypressAppRouterContext>
		)

		// Assert that the button is rendered with the correct label
		cy.get('button').should('exist')
		cy.contains(label).should('be.visible')
	})

	it('handles click event', () => {
		// Mount the Button component
		cy.mount(
			<CypressAppRouterContext>
				<Button
					label="Click"
					path="/new-path"
				/>
			</CypressAppRouterContext>
		)

		cy.get('button').click()

		cy.get('@router:push').should((mock) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			expect(mock).to.have.been.calledOnce
		})
	})
})
