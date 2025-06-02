import { smlogo } from '@assets'
import { CypressAppRouterContext } from '@cypressUtils'
import { User } from '@interfaces'
import stores from '@stores'

//eslint-disable-next-line import/order
import HowToGetCards from './HowToGetCards'

import { onboardingStages } from '../../constants'
import { marketMenu, purchaseButton } from '../../images'

const mountComponent = (showStep4 = false) => {
	const nextStage = cy.stub()

	cy.stub(stores, 'useUserStore').returns({
		onboardingStage: 1,
		inventory: new Array(showStep4 ? 1 : 0)
	} as User)

	cy.mount(
		<CypressAppRouterContext>
			<HowToGetCards nextStage={nextStage} />
		</CypressAppRouterContext>
	)
}

const stageData = onboardingStages[1]

describe('<HowToGetCards />', () => {
	it('renders step 1-3', () => {
		mountComponent()

		cy.getDataCy('header').contains(stageData.header as string)

		// step 1
		cy.getDataCy('body').contains(stageData.body[0])
		cy.getDataCy('logo').should('have.attr', 'src', smlogo.src)
		cy.getDataCy('increment-step-button-1').contains(stageData.label[0]).click()

		// step 2
		cy.getDataCy('body').contains(stageData.body[1])
		cy.getDataCy('market-menu-image').should('have.attr', 'src', marketMenu.src)
		cy.getDataCy('increment-step-button-2').contains(stageData.label[0]).click()

		// step 3
		cy.getDataCy('body').contains(stageData.body[2])
		cy.getDataCy('purchase-bar-image').should('have.attr', 'src', purchaseButton.src)
		cy.getDataCy('close-modal-button').contains(stageData.label[1]).click()
		cy.getDataCy('modal-overlay').should('not.exist')
	})

	it('renders step 4', () => {
		mountComponent(true)

		cy.getDataCy('body').contains(stageData.body[3])
		cy.getDataCy('step-4-button').contains(stageData.label[0])
	})
})
