import { mount } from 'cypress/react'

import { navlinks } from '@constants'

import Links from './Links'

describe('Links Component', () => {
	it('renders all navlinks with correct text and data-cy', () => {
		mount(<Links menu="burger-menu" />)

		cy.getDataCy('links-container').should('exist')
		cy.getDataCy('nav-link').should('have.length', navlinks.length)
		cy.getDataCy('nav-link').eq(0).find('[data-cy="link-text"]').should('contain', navlinks[0].name)
		cy.getDataCy('nav-link').eq(1).find('[data-cy="link-text"]').should('contain', navlinks[1].name)
		cy.getDataCy('nav-link').eq(2).find('[data-cy="link-text"]').should('contain', navlinks[2].name)
	})

	it('applies the correct class to links', () => {
		mount(<Links menu="burger-menu" />)

		cy.getDataCy('nav-link').eq(0).should('have.class', 'burger-menu-link')
	})

	it('calls onClick when a link is clicked', () => {
		const onClick = cy.stub().as('onClick')

		mount(
			<Links
				menu="burger-menu"
				onClick={onClick}
			/>
		)

		cy.getDataCy('nav-link').eq(0).click()
		cy.get('@onClick').should('have.been.called')
	})
})
