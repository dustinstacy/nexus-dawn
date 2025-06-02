import api from '@api'
import { smlogo } from '@assets'
import { CypressAppRouterContext } from '@cypressUtils'
import stores from '@stores'

import Introduction from './Introduction'
import localApi from '../../api'
import { onboardingStages } from '../../constants'

describe('<Introduction />', () => {
	const stageData = onboardingStages[0]

	it('renders correctly', () => {
		const stubbedCallback = cy.stub().as('stubbedCallback')

		cy.stub(localApi, 'completeUserStartingData').as('completeUserStartingDataStub').resolves()
		cy.stub(localApi, 'skipOnboarding').as('skipOnboardingStub').resolves()

		cy.stub(api, 'addCoin').as('addCoinStub').resolves()
		cy.stub(api, 'addCardToCollection').as('addCardToCollectionStub').resolves()
		cy.stub(api, 'addItemToInventory').as('addItemToInventoryStub').resolves()

		cy.stub(stores, 'useUserStore').returns({
			fetchUserData: cy.stub().as('fetchUserDataStub').resolves()
		})
		cy.stub(stores, 'useItemsStore').returns([
			{
				name: 'Rare Pack',
				image: '/rare-pack.png',
				description: 'A pack containing rare items.',
				type: 'pack',
				id: 'rare-pack'
			}
		])

		const cards = []

		for (let i = 0; i < 14; i++) {
			cards.push({
				name: 'Alpha Bot',
				number: 1,
				rarity: i < 2 ? 'Uncommon' : 'Common',
				image: '/card-img-1.png',
				values: [5, 3, 2, 4]
			})
		}

		cy.stub(stores, 'useCardsStore').returns(cards)

		cy.mount(
			<CypressAppRouterContext>
				<Introduction nextStage={stubbedCallback} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('stage').should('exist')
		cy.getDataCy('header').should('contain', stageData.header)
		cy.getDataCy('logo').should('have.attr', 'src', smlogo.src)
		cy.getDataCy('body').should('contain', stageData.body)
		cy.getDataCy('handle-begin-button').should('contain', stageData.label).click()
		cy.get('@completeUserStartingDataStub').should('have.been.called')
		cy.getDataCy('handle-skip-link').should('contain', 'Skip').click()
		cy.get('@completeUserStartingDataStub').should('have.callCount', 2)
	})
})
