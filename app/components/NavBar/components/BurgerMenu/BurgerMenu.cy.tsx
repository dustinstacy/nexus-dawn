import { mount } from 'cypress/react'

import BurgerMenu from './BurgerMenu'

describe('BurgerMenu Component', () => {
	it('renders ok', () => {
		mount(<BurgerMenu />)

		cy.getDataCy('open-icon').should('exist')
		cy.getDataCy('close-icon').should('not.exist')
	})

	it('reacts to clicks', () => {
		mount(<BurgerMenu />)

		cy.getDataCy('open-icon').click()
		cy.getDataCy('open-icon').should('not.exist')
		cy.getDataCy('close-icon').should('exist')

		cy.getDataCy('burger-menu-link').eq(0).should('exist')
		cy.getDataCy('burger-menu-link').eq(0).click()
		cy.getDataCy('close-icon').should('not.exist')
	})
})
