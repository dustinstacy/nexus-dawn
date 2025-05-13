import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as Router from 'next/navigation'

import Button from './Button'

describe('<Button />', () => {
	let router: any

	beforeEach(() => {
		router = {
			push: cy.stub().as('router:push')
		}
		cy.stub(Router, 'useRouter').returns(router)
	})

	it('renders the Button component with the correct label', () => {
		const label = 'Click Me'

		// Mount the Button component
		cy.mount(
			<AppRouterContext.Provider value={router}>
				<Button label={label} />
			</AppRouterContext.Provider>
		)

		// Assert that the button is rendered with the correct label
		cy.get('button').should('exist')
		cy.contains(label).should('be.visible')
	})

	it('handles click event', () => {
		// Mount the Button component
		cy.mount(
			<AppRouterContext.Provider value={router}>
				<Button
					label="Click"
					path="/new-path"
				/>
			</AppRouterContext.Provider>
		)

		cy.get('button').click()

		cy.get('@router:push').should((mock) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			expect(mock).to.have.been.calledOnce
		})
	})
})
