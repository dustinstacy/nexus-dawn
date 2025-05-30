import { IItem } from '@interfaces'

import UserPack from './UserPack'

describe('UserPack', () => {
	const sharedItemName = 'Test Item Pack'

	const itemData: IItem = {
		contents: {
			odds: {
				common: 50,
				rare: 30,
				epic: 15,
				legendary: 5
			}
		},
		image: 'https://example.com/image.png',
		info: 'This is a test item pack.',
		name: sharedItemName
	} as IItem

	const allItems: IItem[] = [
		{
			name: sharedItemName,
			image: 'https://example.com/image.png',
			info: 'This is a test item pack.',
			contents: {
				odds: {
					common: 50,
					rare: 30,
					epic: 15,
					legendary: 5
				}
			}
		},
		{
			name: 'Another Item Pack',
			image: 'https://example.com/another-image.png',
			info: 'This is another test item pack.',
			contents: {
				odds: {
					common: 60,
					rare: 25,
					epic: 10,
					legendary: 5
				}
			}
		}
	] as IItem[]

	it('renders correctly', () => {
		cy.mount(
			<UserPack
				itemData={itemData}
				allItems={allItems}
			/>
		)

		cy.getDataCy('pack-image').should('have.attr', 'src', itemData.image)
		cy.getDataCy('pack-name').should('contain.text', itemData.name)
		cy.getDataCy('info').should('contain.text', itemData.info)
		cy.getDataCy('odds-title').should('contain.text', 'Odds:')
		cy.getDataCy('key-value-common').should('contain.text', 'common:').should('contain.text', '50%')
		cy.getDataCy('key-value-rare').should('contain.text', 'rare:').should('contain.text', '30%')
		cy.getDataCy('key-value-epic').should('contain.text', 'epic:').should('contain.text', '15%')
		cy.getDataCy('key-value-legendary')
			.should('contain.text', 'legendary:')
			.should('contain.text', '5%')
		cy.getDataCy('available-inventory')
			.should('contain.text', 'Available:')
			.should('contain.text', '1')
	})

	it('handles empty itemData', () => {
		cy.mount(
			<UserPack
				itemData={null}
				allItems={allItems}
			/>
		)

		cy.getDataCy('pack-image').should('not.exist')
	})
})
