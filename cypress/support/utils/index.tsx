import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as Router from 'next/navigation'
import React from 'react'

type Props = {
	children: React.ReactNode
}

export const CypressAppRouterContext = (props: Props) => {
	const router: any = {
		push: cy.stub().as('router:push')
	}

	cy.stub(Router, 'useRouter').returns(router)

	return <AppRouterContext.Provider value={router}>{props.children}</AppRouterContext.Provider>
}
