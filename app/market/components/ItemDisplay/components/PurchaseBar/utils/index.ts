import { IItem } from '@interfaces'

// Calulate purchase price based on item quantity and applicable discount
export const calculatePrice = (
	item: IItem,
	quantity: number,
	discount: string
): number => {
	let totalPrice = item.price * quantity
	if (quantity > 1) {
		totalPrice = totalPrice * (1 - parseFloat(discount) / 100)
	}
	return totalPrice
}
