import { smlogo } from '@assets'
import { CypressAppRouterContext } from '@cypressUtils'

import HowToPlay from './HowToPlay'
import { onboardingStages } from '../../constants'

describe('<HowToPlay />', () => {
	it('renders correctly', () => {
		const stubbedCallback = cy.stub().as('stubbedCallback')
		const stageData = onboardingStages[4]

		cy.mount(
			<CypressAppRouterContext>
				<HowToPlay nextStage={stubbedCallback} />
			</CypressAppRouterContext>
		)

		cy.getDataCy('wrapper').should('exist')
		cy.getDataCy('header').should('contain', stageData.header)
		cy.getDataCy('logo').should('have.attr', 'src', smlogo.src)
		cy.getDataCy('body').should('contain', stageData.body)
		cy.getDataCy('button').should('contain', stageData.label).click()
		cy.get('@stubbedCallback').should('have.been.called')
	})
})
