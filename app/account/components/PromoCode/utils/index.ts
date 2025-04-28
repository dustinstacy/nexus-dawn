export const checkPromoCode = async (promoCode: string) => {
	if (promoCode !== process.env.NEXT_PUBLIC_PROMO_CODE) {
		throw new Error('That is incorrect') // Throw error for invalid promo code
	}
}
