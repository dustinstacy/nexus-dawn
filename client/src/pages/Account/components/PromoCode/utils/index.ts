export const checkPromoCode = async (promoCode: string) => {
    if (promoCode !== import.meta.env.VITE_PROMO) {
        throw new Error('That is incorrect') // Throw error for invalid promo code
    }
}
