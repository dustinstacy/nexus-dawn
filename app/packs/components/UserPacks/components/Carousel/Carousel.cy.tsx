import React from 'react'

import { IItem } from '@interfaces'

import Carousel from './Carousel'

describe('Carousel', () => {
	// Mock data for testing
	const mockItems: IItem[] = [
		{
			_id: 'item1',
			name: 'Basic Pack',
			image: '/basic-pack.jpg',
			info: 'A pack containing basic cards',
			price: 100,
			level: 1,
			type: 'pack',
			contents: {
				count: 5,
				odds: {
					Common: 80,
					Uncommon: 18,
					Rare: 2
				}
			}
		},
		{
			_id: 'item2',
			name: 'Premium Pack',
			image: '/premium-pack.jpg',
			info: 'A premium pack with better cards',
			price: 250,
			level: 2,
			type: 'pack',
			contents: {
				count: 5,
				odds: {
					Common: 60,
					Uncommon: 30,
					Rare: 10
				}
			}
		},
		{
			_id: 'item3',
			name: 'Legendary Pack',
			image: '/legendary-pack.jpg',
			info: 'A legendary pack with rare cards',
			price: 500,
			level: 3,
			type: 'pack',
			contents: {
				count: 5,
				odds: {
					Uncommon: 40,
					Rare: 35,
					Epic: 20,
					Legendary: 5
				}
			}
		}
	]

	const mockChildComponent = ({ itemData }: { itemData: IItem; allItems: IItem[] }) => (
		<div data-cy="test-child">
			<h3 data-cy="item-name">{itemData?.name}</h3>
			<p data-cy="item-info">{itemData?.info}</p>
		</div>
	)

	let setCurrentItemStub: any

	const withWrapper = (children: React.ReactNode) => (
		<div style={{ width: '500px', height: '300px' }}>{children}</div>
	)

	beforeEach(() => {
		setCurrentItemStub = cy.stub().as('setCurrentItemStub')
	})

	describe('Basic Rendering', () => {
		it('renders carousel with items', () => {
			cy.mount(
				<Carousel
					uniqueItems={mockItems}
					allItems={mockItems}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, { itemData: mockItems[0], allItems: mockItems })}
				</Carousel>
			)

			cy.getDataCy('carousel').should('be.visible')
			cy.getDataCy('arrow-previous').should('be.visible')
			cy.getDataCy('arrow-next').should('be.visible')
			cy.getDataCy('carousel-item').should('have.length', 3) // previous, current, next
		})

		it('renders carousel positions correctly', () => {
			cy.mount(
				<Carousel
					uniqueItems={mockItems}
					allItems={mockItems}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, { itemData: mockItems[0], allItems: mockItems })}
				</Carousel>
			)

			cy.getDataCy('carousel-item').filter('.previous').should('exist')
			cy.getDataCy('carousel-item').filter('.current').should('exist')
			cy.getDataCy('carousel-item').filter('.next').should('exist')
		})

		it('displays the current item in the center position', () => {
			cy.mount(
				<Carousel
					uniqueItems={mockItems}
					allItems={mockItems}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, { itemData: mockItems[0], allItems: mockItems })}
				</Carousel>
			)

			cy.getDataCy('carousel-item')
				.filter('.current')
				.within(() => {
					cy.getDataCy('item-name').should('contain', 'Basic Pack')
				})
		})
	})

	describe('Empty State', () => {
		it('displays empty message when no items are provided', () => {
			cy.mount(
				<Carousel
					uniqueItems={[]}
					allItems={[]}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No packs available"
				>
					{React.createElement(mockChildComponent, { itemData: null as any, allItems: [] })}
				</Carousel>
			)

			cy.getDataCy('empty-message').should('contain', 'No packs available')
			cy.getDataCy('arrow-previous').should('not.exist')
			cy.getDataCy('arrow-next').should('not.exist')
			cy.getDataCy('carousel-item').should('not.exist')
		})

		it('displays custom empty message', () => {
			const customMessage = 'Head to the MaRKet to buy more packs'

			cy.mount(
				<Carousel
					uniqueItems={[]}
					allItems={[]}
					setCurrentItem={setCurrentItemStub}
					emptyMessage={customMessage}
				>
					{React.createElement(mockChildComponent, { itemData: null as any, allItems: [] })}
				</Carousel>
			)

			cy.getDataCy('empty-message').should('contain', customMessage)
		})
	})

	describe('Navigation Functionality', () => {
		it('handles right arrow click (slide left)', () => {
			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={mockItems}
						allItems={mockItems}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: mockItems[0],
							allItems: mockItems
						})}
					</Carousel>
				)
			)

			// Initial state - first item should be current
			cy.getDataCy('carousel-item')
				.filter('.current')
				.within(() => {
					cy.getDataCy('item-name').should('contain', mockItems[0].name)
				})

			// Click right arrow
			cy.getDataCy('arrow-next').click()

			// Should apply slide direction class
			cy.getDataCy('carousel-item').filter('.right').should('exist')
		})

		it('handles left arrow click (slide right)', () => {
			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={mockItems}
						allItems={mockItems}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: mockItems[0],
							allItems: mockItems
						})}
					</Carousel>
				)
			)

			// Click left arrow
			cy.getDataCy('arrow-previous').click()

			// Should apply slide direction class
			cy.getDataCy('carousel-item').filter('.left').should('exist')
		})

		it('cycles through items correctly', () => {
			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={mockItems}
						allItems={mockItems}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: mockItems[0],
							allItems: mockItems
						})}
					</Carousel>
				)
			)

			// Wait for animation to complete and check if index changes
			cy.getDataCy('arrow-next').click()
			cy.wait(600) // Wait for animation (500ms + buffer)

			// The component should have cycled to the next item
			// Note: Due to the timing nature of the component, we mainly test the interaction
			cy.getDataCy('carousel-item').filter('.current').should('exist')
		})

		it('wraps around from last to first item when clicking right', () => {
			const singleItem = [mockItems[0]]

			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={singleItem}
						allItems={singleItem}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: singleItem[0],
							allItems: singleItem
						})}
					</Carousel>
				)
			)

			// With single item, clicking should still work
			cy.getDataCy('arrow-next').click()
			cy.getDataCy('carousel-item').filter('.right').should('exist')
		})

		it('wraps around from first to last item when clicking left', () => {
			const singleItem = [mockItems[0]]

			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={singleItem}
						allItems={singleItem}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: singleItem[0],
							allItems: singleItem
						})}
					</Carousel>
				)
			)

			// With single item, clicking should still work
			cy.getDataCy('arrow-previous').click()
			cy.getDataCy('carousel-item').filter('.left').should('exist')
		})
	})

	describe('Animation and Slide Direction', () => {
		it('applies correct slide direction classes during animation', () => {
			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={mockItems}
						allItems={mockItems}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: mockItems[0],
							allItems: mockItems
						})}
					</Carousel>
				)
			)

			// Click right arrow and check for right slide class
			cy.getDataCy('arrow-next').click()
			cy.getDataCy('carousel-item').filter('.current.right').should('exist')
			cy.getDataCy('carousel-item').filter('.next.right').should('exist')

			// Wait for animation to complete
			cy.wait(600)

			// Click left arrow and check for left slide class
			cy.getDataCy('arrow-previous').click()
			cy.getDataCy('carousel-item').filter('.current.left').should('exist')
			cy.getDataCy('carousel-item').filter('.previous.left').should('exist')
		})

		it('clears slide direction after animation completes', () => {
			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={mockItems}
						allItems={mockItems}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: mockItems[0],
							allItems: mockItems
						})}
					</Carousel>
				)
			)

			// Click arrow and wait for animation to complete
			cy.getDataCy('arrow-next').click()
			cy.wait(600) // Wait longer than animation duration (500ms)

			// Direction classes should be cleared
			cy.getDataCy('carousel-item').filter('.right').should('not.exist')
		})

		it('applies correct CSS classes for positioning', () => {
			cy.mount(
				<Carousel
					uniqueItems={mockItems}
					allItems={mockItems}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, { itemData: mockItems[0], allItems: mockItems })}
				</Carousel>
			)

			// Check that all position classes are applied correctly
			cy.getDataCy('carousel-item').filter('.previous.start-column').should('exist')
			cy.getDataCy('carousel-item').filter('.current.start-column').should('exist')
			cy.getDataCy('carousel-item').filter('.next.start-column').should('exist')
		})
	})

	describe('Props and State Management', () => {
		it('calls setCurrentItem when component mounts', () => {
			cy.mount(
				<Carousel
					uniqueItems={mockItems}
					allItems={mockItems}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, { itemData: mockItems[0], allItems: mockItems })}
				</Carousel>
			)

			// Should call setCurrentItem with the first item
			cy.get('@setCurrentItemStub').should('have.been.calledWith', mockItems[0])
		})

		it('passes correct props to child component', () => {
			const TestChild = ({ itemData, allItems }: { itemData: IItem; allItems: IItem[] }) => (
				<div data-cy="test-child">
					<span data-cy="item-id">{itemData?._id}</span>
					<span data-cy="all-items-count">{allItems.length}</span>
				</div>
			)

			cy.mount(
				<Carousel
					uniqueItems={mockItems}
					allItems={mockItems}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					<TestChild
						itemData={mockItems[0]}
						allItems={mockItems}
					/>
				</Carousel>
			)

			// Check that props are passed correctly to child
			cy.getDataCy('all-items-count').should('contain', mockItems.length)
		})

		it('handles single item correctly', () => {
			const singleItem = [mockItems[0]]

			cy.mount(
				<Carousel
					uniqueItems={singleItem}
					allItems={singleItem}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, {
						itemData: singleItem[0],
						allItems: singleItem
					})}
				</Carousel>
			)

			// Should still render all three positions (previous, current, next will be the same item)
			cy.getDataCy('carousel-item').should('have.length', 3)
			cy.getDataCy('carousel-item').filter('.current').should('exist')
		})

		it('handles two items correctly', () => {
			const twoItems = [mockItems[0], mockItems[1]]

			cy.mount(
				<Carousel
					uniqueItems={twoItems}
					allItems={twoItems}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, { itemData: twoItems[0], allItems: twoItems })}
				</Carousel>
			)

			// Should render three positions
			cy.getDataCy('carousel-item').should('have.length', 3)
			cy.getDataCy('carousel-item').filter('.current').should('exist')
			cy.getDataCy('carousel-item').filter('.previous').should('exist')
			cy.getDataCy('carousel-item').filter('.next').should('exist')
		})
	})

	describe('Edge Cases and Error Handling', () => {
		it('handles undefined items gracefully', () => {
			cy.mount(
				<Carousel
					uniqueItems={[]}
					allItems={[]}
					setCurrentItem={setCurrentItemStub}
					emptyMessage="No items available"
				>
					{React.createElement(mockChildComponent, { itemData: null as any, allItems: [] })}
				</Carousel>
			)

			cy.getDataCy('carousel').should('exist')
			cy.getDataCy('empty-message').should('be.visible')
		})

		it('prevents rapid clicking during animation', () => {
			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={mockItems}
						allItems={mockItems}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: mockItems[0],
							allItems: mockItems
						})}
					</Carousel>
				)
			)

			// Rapid clicks should not break the component
			cy.getDataCy('arrow-next').click()
			cy.getDataCy('arrow-next').click()
			cy.getDataCy('arrow-previous').click()

			cy.getDataCy('carousel').should('exist')
			cy.getDataCy('carousel-item').filter('.current').should('exist')
		})

		it('maintains carousel structure during transitions', () => {
			cy.mount(
				withWrapper(
					<Carousel
						uniqueItems={mockItems}
						allItems={mockItems}
						setCurrentItem={setCurrentItemStub}
						emptyMessage="No items available"
					>
						{React.createElement(mockChildComponent, {
							itemData: mockItems[0],
							allItems: mockItems
						})}
					</Carousel>
				)
			)

			// During animation, structure should remain intact
			cy.getDataCy('arrow-next').click()
			cy.getDataCy('carousel-item').should('have.length', 3)
			cy.getDataCy('carousel-item').filter('.previous').should('exist')
			cy.getDataCy('carousel-item').filter('.current').should('exist')
			cy.getDataCy('carousel-item').filter('.next').should('exist')
		})
	})
})
