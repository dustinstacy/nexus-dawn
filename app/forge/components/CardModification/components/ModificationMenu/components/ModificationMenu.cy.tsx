import { CypressAppRouterContext } from '@cypressUtils'
import { IItem, User } from '@interfaces'
import stores from '@stores'

import ModificationMenu from '../ModificationMenu'

describe('ModificationMenu', () => {
	it('renders', () => {
		const setModificationInProgressStub = cy.stub().as('setModificationInProgressStub')
		const setCardModificationStub = cy.stub().as('setCardModificationStub')
		const name = 'modification-1'

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
				info: 'modification-1 info'
			}
		] as IItem[])

		cy.mount(
			<CypressAppRouterContext>
				<ModificationMenu
					selectedCard={{
						name: 'Test Card',
						number: 1,
						rarity: 'Common',
						image: 'test-image.png',
						values: [1, 2, 3, 4]
					}}
					setSelectedCard={() => {}}
					setCardModification={setCardModificationStub}
					selectedModification={'modification1'}
					setSelectedModification={() => {}}
					setModificationInProgress={setModificationInProgressStub}
				/>
			</CypressAppRouterContext>
		)

		cy.getDataCy('modify-card-button').should('exist').click()
		cy.get('@setModificationInProgressStub').should('have.been.calledWith', true)
		cy.getDataCy('exit-button').should('exist').click()
		cy.get('@setCardModificationStub').should('have.been.calledWith', false)
	})
})
