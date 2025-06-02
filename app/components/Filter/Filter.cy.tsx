import { mount } from 'cypress/react'
import { useState } from 'react'

import Filter from './Filter'

describe('Filter Component', () => {
	const options = ['Option 1', 'Option 2', 'Option 3']
	const label = 'Test Filter'
	const id = 'test-filter'

	it('renders the label and select with options', () => {
		const TestWrapper = () => {
			const [value, setValue] = useState(options[0])

			return (
				<Filter
					label={label}
					value={value}
					setValue={setValue}
					options={options}
					id={id}
				/>
			)
		}

		mount(<TestWrapper />)

		cy.getDataCy('filter-label').should('contain', label).and('have.attr', 'for', id)
		cy.getDataCy('filter-select').should('have.id', id)
		cy.getDataCy('filter-option').should('have.length', options.length)

		options.forEach((option, idx) => {
			cy.getDataCy('filter-option').eq(idx).should('have.text', option)
		})
	})

	it('selects the correct value and calls setValue on change', () => {
		const TestWrapper = () => {
			const [value, setValue] = useState(options[0])

			return (
				<>
					<div data-cy="selected-value">{value}</div>
					<Filter
						label={label}
						value={value}
						setValue={setValue}
						options={options}
						id={id}
					/>
				</>
			)
		}

		mount(<TestWrapper />)

		cy.getDataCy('filter-select').select(options[1])
		cy.getDataCy('selected-value').should('contain', options[1])
	})

	it('renders with a numeric value and options', () => {
		const numOptions = [1, 2, 3]
		const TestWrapper = () => {
			const [value, setValue] = useState(numOptions[0].toString())

			return (
				<Filter
					label={label}
					value={value}
					setValue={setValue}
					options={numOptions}
					id={id}
				/>
			)
		}

		mount(<TestWrapper />)

		cy.getDataCy('filter-option').should('have.length', numOptions.length)

		numOptions.forEach((option, idx) => {
			cy.getDataCy('filter-option').eq(idx).should('have.text', option.toString())
		})
	})
})
