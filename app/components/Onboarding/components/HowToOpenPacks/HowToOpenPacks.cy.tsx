import api from '@api'
import { CypressAppRouterContext } from '@cypressUtils'
import stores from '@stores'

import HowToOpenPacks from './HowToOpenPacks'
import { onboardingStages } from '../../constants'
import { openPack, packOdds } from '../../images'

const mountComponent = (showStep4 = false) => {
	const nextStage = cy.stub()

	cy.stub(stores, 'useUserStore').returns({
		user: {
			onboardingStage: showStep4 ? 2 : 1
		},
		userCards: new Array(showStep4 ? 1 : 0)
	})

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
	cy.stub(api, 'addCardToCollection').as('addCardToCollectionStub').resolves()

	cy.mount(
		<CypressAppRouterContext>
			<HowToOpenPacks nextStage={nextStage} />
		</CypressAppRouterContext>
	)
}

const stageData = onboardingStages[2]

describe('<HowToOpenPacks />', () => {
	it('renders step 1-3', () => {
		mountComponent()

		cy.getDataCy('header').contains(stageData.header as string)

		// step 1
		cy.getDataCy('body').contains(stageData.body[0])
		cy.getDataCy('increment-step-button-1').contains(stageData.label[0]).click()

		// step 2
		cy.getDataCy('body').contains(stageData.body[1])
		cy.getDataCy('pack-odds-image').should('have.attr', 'src', packOdds.src)
		cy.getDataCy('increment-step-button-2').contains(stageData.label[0]).click()

		// step 3
		cy.getDataCy('body').contains(stageData.body[2])
		cy.getDataCy('open-pack-image').should('have.attr', 'src', openPack.src)
		cy.getDataCy('close-modal-button').contains(stageData.label[1]).click()
		cy.getDataCy('modal-overlay').should('not.exist')
	})

	it('renders step 4', () => {
		mountComponent(true)

		cy.getDataCy('body').contains(stageData.body[3])
		cy.getDataCy('step-4-button').contains(stageData.label[0]).click()
		cy.get('@addCardToCollectionStub').should('have.been.called')
	})
})
