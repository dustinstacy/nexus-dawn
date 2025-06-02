import { CypressAppRouterContext } from '@cypressUtils'
import { ICard, User } from '@interfaces'
import stores from '@stores'

import PackContents from './PackContents'

describe('PackContent Component', () => {
	const packContents: ICard[] = [
		{
			captured: true,
			color: 'red',
			_id: '1',
			image: 'image1.png',
			values: [1, 2, 3, 4]
		} as ICard,
		{
			captured: false,
			color: 'green',
			_id: '2',
			image: 'image2.png',
			values: [4, 3, 2, 1]
		} as ICard
	]

	describe('renders', () => {
		it('renders ok with disabled back button', () => {
			cy.stub(stores, 'useUserStore').returns({
				onboardingStage: 1
			} as User)

			cy.mount(
				<CypressAppRouterContext>
					<PackContents
						packContents={packContents}
						setPackContents={() => {}}
					/>
				</CypressAppRouterContext>
			)

			cy.getDataCy('card-1').should('exist')
			cy.getDataCy('card-2').should('exist')
			cy.getDataCy('go-back-button').should('have.class', 'disabled')
		})

		it('renders an enabled back button when stage is 5', () => {
			cy.stub(stores, 'useUserStore').returns({
				onboardingStage: 5
			} as User)

			cy.mount(
				<CypressAppRouterContext>
					<PackContents
						packContents={packContents}
						setPackContents={() => {}}
					/>
				</CypressAppRouterContext>
			)

			cy.getDataCy('go-back-button').should('not.have.class', 'disabled')
		})

		it('renders when packContents is null', () => {
			cy.stub(stores, 'useUserStore').returns({
				onboardingStage: 1
			} as User)

			cy.mount(
				<CypressAppRouterContext>
					<PackContents
						packContents={null}
						setPackContents={() => {}}
					/>
				</CypressAppRouterContext>
			)

			cy.getDataCy('go-back-button').should('exist')
		})
	})
})
