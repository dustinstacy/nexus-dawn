import { CypressAppRouterContext } from '@cypressUtils'

import TextInput from './TextInput'

describe('<TextInput />', () => {
	it('renders as a password field', () => {
		const name = 'name'
		const value = 'value'
		const onChange = cy.stub().as('onChangeStub')

		cy.mount(
			<CypressAppRouterContext>
				<TextInput
					label="Password"
					name={name}
					value={value}
					onChange={onChange}
					loading={false}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('outer-container').should('exist')
		cy.getDataCy('input')
			.should('exist')
			.should('have.value', value)
			.should('have.attr', 'name', name)
			.should('not.be.disabled')
			.type('input')
		cy.get('@onChangeStub').should('have.been.called')
		cy.getDataCy('eye-icon-invisible').should('exist').click()
		cy.getDataCy('eye-icon-visible').should('exist')
	})

	it('renders as disabled', () => {
		cy.mount(
			<CypressAppRouterContext>
				<TextInput
					label=""
					name=""
					value=""
					onChange={() => {}}
					loading={true}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('input').should('be.disabled')
	})
})
