import { IItem } from 'src/global.interfaces'

// Calulate purchase price based on item quantity and applicable discount
export const calculatePrice = (
    item: IItem,
    quantity: number,
    discount: string
): number => {
    let totalPrice = item.price * quantity
    if (quantity > 1) {
        totalPrice *= 100 - parseFloat(discount) / 100
    }
    return totalPrice
}
