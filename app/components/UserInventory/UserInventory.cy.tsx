import { coinImage } from '@assets'
import { CypressAppRouterContext } from '@cypressUtils'
import stores from '@stores'

import UserInventory from './UserInventory'

describe('UserInventory', () => {
	it('renders correctly', () => {
		cy.stub(stores, 'useUserStore').returns({
			coin: 100
		})

		cy.mount(
			<CypressAppRouterContext>
				<UserInventory />
			</CypressAppRouterContext>
		)

		cy.getDataCy('user-inventory').should('exist')
		cy.getDataCy('coin').should('contain', '100')
		cy.getDataCy('coin-image').should('have.attr', 'src', coinImage.src)
	})
})
