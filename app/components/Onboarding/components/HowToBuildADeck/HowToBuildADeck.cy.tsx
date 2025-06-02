import { smlogo } from '@assets'
import { CypressAppRouterContext } from '@cypressUtils'
import { User } from '@interfaces'
import stores from '@stores'

import HowToBuildADeck from './HowToBuildADeck'
import { onboardingStages } from '../../constants'
import { checkbox, optimizeDeck } from '../../images'

const mountComponent = (stage: 1 | 3) => {
	const nextStage = cy.stub()

	cy.stub(stores, 'useUserStore').returns({
		user: {
			onboardingStage: stage
		} as User,
		userDeck: new Array(stage === 1 ? 0 : 5)
	})

	cy.mount(
		<CypressAppRouterContext>
			<HowToBuildADeck nextStage={nextStage} />
		</CypressAppRouterContext>
	)
}

const stageData = onboardingStages[3]

describe('<HowToBuildADeck />', () => {
	it('renders step 1-3', () => {
		mountComponent(1)

		cy.getDataCy('header').contains(stageData.header as string)

		// step 1
		cy.getDataCy('body').contains(stageData.body[0])
		cy.getDataCy('logo').should('have.attr', 'src', smlogo.src)
		cy.getDataCy('increment-step-button-1').contains(stageData.label[0]).click()

		// step 2
		cy.getDataCy('body').contains(stageData.body[1])
		cy.getDataCy('optimize-deck-image').should('have.attr', 'src', optimizeDeck.src)
		cy.getDataCy('increment-step-button-2').contains(stageData.label[0]).click()

		// step 3
		cy.getDataCy('body').contains(stageData.body[2])
		cy.getDataCy('check-box-image').should('have.attr', 'src', checkbox.src)
		cy.getDataCy('close-modal-button').contains(stageData.label[1]).click()
		cy.getDataCy('modal-overlay').should('not.exist')
	})

	it('renders step 4', () => {
		mountComponent(3)

		cy.getDataCy('body').contains(stageData.body[3])
		cy.getDataCy('step-4-button').contains(stageData.label[0])
	})
})
