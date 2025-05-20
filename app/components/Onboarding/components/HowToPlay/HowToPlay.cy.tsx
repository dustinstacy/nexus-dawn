import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as Router from 'next/navigation'

import { smlogo } from '@assets'

import HowToPlay from './HowToPlay'
import { onboardingStages } from '../../constants'

describe('<HowToPlay />', () => {
	it('renders correctly', () => {
		const stubbedCallback = cy.stub().as('stubbedCallback')
		const stageData = onboardingStages[4]

		const router: any = {
			push: cy.stub().as('router:push')
		}

		cy.stub(Router, 'useRouter').returns(router)

		cy.mount(
			<AppRouterContext.Provider value={router}>
				<HowToPlay nextStage={stubbedCallback} />
			</AppRouterContext.Provider>
		)

		cy.getDataCy('wrapper').should('exist')
		cy.getDataCy('header').should('contain', stageData.header)
		cy.getDataCy('logo').should('have.attr', 'src', smlogo.src)
		cy.getDataCy('body').should('contain', stageData.body)
		cy.getDataCy('button').should('contain', stageData.label).click()
		cy.get('@stubbedCallback').should('have.been.called')
	})
})
