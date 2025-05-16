// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

declare global {
	namespace Cypress {
		interface Chainable {}
	}
}

import { mount } from 'cypress/react'
import '../../app/setup'
import './commands'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount
			getDataCy(selector: string): Chainable<JQuery<HTMLElement>>
		}
	}
}

Cypress.Commands.add('mount', mount)

// Add support for data-cy attribute selector
Cypress.Commands.add('getDataCy', (selector: string) => {
	return cy.get(`[data-cy="${selector}"]`)
})
