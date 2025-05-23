import { howToPlay } from './constants'
import HowToPlay from './page'

describe('HowToPlay', () => {
	it('renders the table of contents with all sections', () => {
		cy.mount(<HowToPlay />)

		// Check that the TOC contains all section headers
		cy.getDataCy('toc-item').should('have.length', howToPlay.length)

		// Check that all section headers are displayed
		howToPlay.forEach((section, index) => {
			cy.getDataCy('toc-item').eq(index).should('contain', section.header)
		})
	})

	it('displays the first section content by default', () => {
		cy.mount(<HowToPlay />)

		// Check that first section header is shown in content area
		cy.getDataCy('how-to-play-heading').should('contain', howToPlay[0].header)

		// Check that first section is marked active in TOC
		cy.getDataCy('toc-item').first().should('have.class', 'active')
	})

	it('navigates to the correct section when clicking on TOC items', () => {
		cy.mount(<HowToPlay />)

		// Click on the second TOC item
		cy.getDataCy('toc-item').eq(1).click()

		// Check that second section content is displayed
		cy.getDataCy('how-to-play-heading').should('contain', howToPlay[1].header)

		// Check that second TOC item is now active
		cy.getDataCy('toc-item').eq(1).should('have.class', 'active')
		cy.getDataCy('toc-item').eq(0).should('not.have.class', 'active')
	})

	it('displays section content with titles, lists, and images', () => {
		cy.mount(<HowToPlay />)

		// Check first section content
		const firstSection = howToPlay[0]

		// Check section titles
		firstSection.body.forEach((item, index) => {
			cy.getDataCy('section-title').eq(index).should('contain', item.title)

			// Check list items
			item.content.forEach((point, pointIndex) => {
				cy.getDataCy('section').eq(index).find('li').eq(pointIndex).should('contain', point)
			})

			// Check images if they exist
			if (item.imageSrc) {
				cy.getDataCy('section')
					.eq(index)
					.find('img')
					.should('have.attr', 'src')
					.and('contain', item.imageSrc.src.replaceAll('/', '%2F'))
			}
		})
	})

	it('disables Previous button on first page', () => {
		cy.mount(<HowToPlay />)

		// Check Previous button is disabled on first page
		cy.getDataCy('previous-button').should('be.disabled')

		// Next button should be enabled (if there's more than one page)
		if (howToPlay.length > 1) {
			cy.getDataCy('next-button').should('not.be.disabled')
		}
	})

	it('disables Next button on last page', () => {
		cy.mount(<HowToPlay />)

		// Navigate to the last page by clicking on the last TOC item
		cy.getDataCy('toc-item')
			.eq(howToPlay.length - 1)
			.click()

		// Check Next button is disabled on last page
		cy.getDataCy('next-button').should('be.disabled')

		// Previous button should be enabled (if there's more than one page)
		if (howToPlay.length > 1) {
			cy.getDataCy('previous-button').should('not.be.disabled')
		}
	})

	it('navigates to the next section when clicking Next button', () => {
		cy.mount(<HowToPlay />)

		// Click Next button
		cy.getDataCy('next-button').click()

		// Check that second section content is displayed
		cy.getDataCy('how-to-play-heading').should('contain', howToPlay[1].header)

		// Check that second TOC item is now active
		cy.getDataCy('toc-item').eq(1).should('have.class', 'active')
	})

	it('navigates to the previous section when clicking Previous button', () => {
		cy.mount(<HowToPlay />)

		// Navigate to second section first
		cy.getDataCy('next-button').click()

		// Then click Previous button
		cy.getDataCy('previous-button').click()

		// Check that first section content is displayed again
		cy.getDataCy('how-to-play-heading').should('contain', howToPlay[0].header)

		// Check that first TOC item is now active again
		cy.getDataCy('toc-item').eq(0).should('have.class', 'active')
	})

	it('does not navigate beyond valid page ranges', () => {
		cy.mount(<HowToPlay />)

		// Try to go beyond first page (should stay on first page)
		cy.getDataCy('previous-button').should('be.disabled')

		// Navigate to last page
		for (let i = 0; i < howToPlay.length - 1; i++) {
			cy.getDataCy('next-button').click()
		}

		// Try to go beyond last page (should stay on last page)
		cy.getDataCy('next-button').should('be.disabled')
	})
})
