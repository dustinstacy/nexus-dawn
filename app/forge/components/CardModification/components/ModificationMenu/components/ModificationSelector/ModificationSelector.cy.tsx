import { CypressAppRouterContext } from '@cypressUtils'
import { IItem, User } from '@interfaces'
import stores from '@stores'

import ModificationSelector from './ModificationSelector'

describe('ModificationSelector', () => {
	it('renders with no modification selected', () => {
		const name = 'modification-1'
		const infoString = 'modification-1 info'

		cy.stub(stores, 'useUserStore').returns({
			inventory: [
				{
					type: 'modifier',
					name: name
				}
			]
		} as User)

		cy.stub(stores, 'useItemsStore').returns([
			{
				name: name,
				info: infoString
			}
		] as IItem[])

		cy.mount(
			<CypressAppRouterContext>
				<ModificationSelector
					selectedModification={name}
					setSelectedModification={() => {}}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('modification-info').contains(infoString)
	})
})
