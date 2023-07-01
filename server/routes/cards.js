import express from 'express'
import { requiresAuth, requiresAdmin } from '../middleware/permissions.js'
import Card from '../models/Card.js'

const router = express.Router()

// @route GET /api/cards/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
    res.send('Cards route working')
})

// @route GET /api/cards
// @desc Get all released cards
// @access Private
router.get('/', async (req, res, next) => {
    try {
        const cards = await Card.find()

        return res.json(cards)
    } catch (error) {
        next(error)
    }
})

// @route POST /api/cards/new
// @desc Release new card
// @access Admin
router.post('/new', requiresAuth, requiresAdmin, async (req, res, next) => {
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
        return res.json(newCard)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/cards/:cardId
// @desc Update released card
// @desc Admin
router.put('/:cardId', requiresAuth, requiresAdmin, async (req, res, next) => {
    try {
        const { name, number, image, rarity, empower, weaken } = req.body

        const card = await Card.findOneAndUpdate(
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

        if (!card) {
            return res.status(404).json({ error: 'Card not found' })
        }

        return res.json(updatedCard)
    } catch (error) {
        next(error)
    }
})

// @route DELETE /api/cards/:cardId/delete
// @desc Remove released card
// @access Admin
router.delete(
    '/:cardId/remove',
    requiresAuth,
    requiresAdmin,
    async (req, res, next) => {
        try {
            const card = await Card.findOne({
                _id: req.params.cardId,
            })

            if (!card) {
                return res.status(404).json({ error: 'Card not found' })
            }

            await Card.findOneAndRemove({
                _id: req.params.cardId,
            })

            return res.json({ success: true })
        } catch (error) {
            next(error)
        }
    }
)

export default router
