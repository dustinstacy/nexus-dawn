import { CypressAppRouterContext } from '@cypressUtils'
import utils from '@utils'

import Loader from './Loader'

describe('Loader Component', () => {
	beforeEach(() => {
		// Mock utils.classSet to ensure consistent class generation
		cy.stub(utils, 'classSet').callsFake((...classes) => {
			return classes.filter(Boolean).join(' ')
		})
	})

	describe('Basic rendering', () => {
		it('renders the correct number of nested squares', () => {
			const depth = 3

			cy.mount(
				<CypressAppRouterContext>
					<Loader depth={depth} />
				</CypressAppRouterContext>
			)

			// Assert that the correct number of nested squares are rendered
			cy.getDataCy('square').should('have.length', depth)
		})

		it('renders squares with correct classes based on depth', () => {
			cy.mount(
				<CypressAppRouterContext>
					<Loader depth={4} />
				</CypressAppRouterContext>
			)

			// Assert that squares at even depths have the 'white' class
			cy.getDataCy('square').eq(0).should('have.class', 'white')
			cy.getDataCy('square').eq(2).should('have.class', 'white')

			// Assert that squares at odd depths have the 'background-gradient' class
			cy.getDataCy('square').eq(1).should('have.class', 'background-gradient')
			cy.getDataCy('square').eq(3).should('have.class', 'background-gradient')
		})
	})

	describe('Error handling', () => {
		it('handles depth <=0', () => {
			cy.mount(
				<CypressAppRouterContext>
					<Loader depth={0} />
				</CypressAppRouterContext>
			)

			// Assert that no squares are rendered
			cy.getDataCy('square').should('not.exist')

			cy.mount(
				<CypressAppRouterContext>
					<Loader depth={-1} />
				</CypressAppRouterContext>
			)

			// Assert that no squares are rendered
			cy.getDataCy('square').should('not.exist')
		})
	})
})
