export const checkPromoCode = async (promoCode: string) => {
    if (promoCode !== process.env.PROMO_CODE) {
        throw new Error("That is incorrect") // Throw error for invalid promo code
    }
}
