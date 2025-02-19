export const checkPromoCode = async (promoCode: string) => {
    if (promoCode !== "GODMODE") {
        throw new Error("That is incorrect") // Throw error for invalid promo code
    }
}
