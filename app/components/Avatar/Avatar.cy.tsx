import Avatar from './Avatar'

import stores from '@stores'

describe('<Avatar />', () => {
	const imgUrl = 'url.to.som.image'

	beforeEach(() => {
		// Stub the Zustand store to return a user
		stores.useUserStore.setState({
			// @ts-expect-error These are the only props that matter here
			user: {
				image: imgUrl,
				level: 5,
				color: '#ff0000'
			}
		})
	})

	it('renders the avatar with user data', () => {
		cy.mount(<Avatar levelShowing={true} />)

		// Assert that the avatar image is rendered
		cy.get('img[alt="user image"]').should('have.attr', 'src', imgUrl)
		cy.contains(/LVL\s+5/).should('be.visible')
	})

	it('renders without crashing when user is null', () => {
		// Update the Zustand store to return null for the user
		stores.useUserStore.setState({
			user: null
		})

		cy.mount(<Avatar levelShowing={true} />)

		// Assert that the component renders without crashing
		cy.get('.avatar').should('exist')
	})
})
