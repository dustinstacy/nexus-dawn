import express, { Request, Response, NextFunction } from "express"

import { requiresAuth, requiresAdmin } from "../middleware/permissions"
import Card from "../models/Card"

const router = express.Router()

// @route GET /api/cards/test
// @desc Test the auth route
// @access Public
router.get("/test", (req: Request, res: Response) => {
    res.send("Cards route working")
})

// @route GET /api/cards
// @desc Get all released cards
// @access Private
router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cards = await Card.find()

        res.json(cards)
        return
    } catch (error) {
        next(error)
    }
})

// @route POST /api/cards/new
// @desc Release new card
// @access Admin
router.post(
    "/new",
    requiresAuth,
    requiresAdmin,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, number, image, rarity, empower, weaken } = req.body

            const newCard = new Card({
                name: name,
                number: number,
                image: image,
                rarity: rarity,
                empower: empower,
                weaken: weaken,
            })

            await newCard.save()
            res.json(newCard)
            return
        } catch (error) {
            next(error)
        }
    }
)

// @route PUT /api/cards/:cardId
// @desc Update released card
// @desc Admin
router.put(
    "/:cardId",
    requiresAuth,
    requiresAdmin,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, number, image, rarity, empower, weaken } = req.body

            const updatedCard = await Card.findOneAndUpdate(
                {
                    _id: req.params.cardId,
                },
                {
                    name: name,
                    number: number,
                    image: image,
                    rarity: rarity,
                    empower: empower,
                    weaken: weaken,
                },
                {
                    new: true,
                }
            )

            if (!updatedCard) {
                res.status(404).json({ error: "Card not found" })
                return
            }

            res.json(updatedCard)
            return
        } catch (error) {
            next(error)
        }
    }
)

// @route DELETE /api/cards/:cardId/delete
// @desc Remove released card
// @access Admin
router.delete(
    "/:cardId/remove",
    requiresAuth,
    requiresAdmin,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const card = await Card.findOne({
                _id: req.params.cardId,
            })

            if (!card) {
                res.status(404).json({ error: "Card not found" })
                return
            }

            await Card.findOneAndDelete({
                _id: req.params.cardId,
            })

            res.json({ success: true })
            return
        } catch (error) {
            next(error)
        }
    }
)

export default router
