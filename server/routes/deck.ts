import express, { Request, Response, NextFunction } from 'express'

import { requiresAuth } from '../middleware/permissions.js'
import Deck from '../models/Deck.ts'
import User from '../models/User.ts'
import { hasUser } from '../utils/index.ts'

const router = express.Router()

// @route GET /api/deck/test
// @desc Test the Deck route
// @access Public
router.get('/test', (req: Request, res: Response) => {
    res.send('Deck route working')
})

// @route GET /api/deck
// @desc Get user's Deck
// @access Private
router.get(
    '/',
    requiresAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!hasUser(req)) {
                return res.status(404).json({ error: 'User not found' })
            }

            const deck = await Deck.findOne({
                user: req.user._id,
            }).lean()

            return res.json(deck)
        } catch (error) {
            next(error)
        }
    }
)

// @route POST /api/deck
// @route Create a new user Deck
// @access Private
router.post(
    '/',
    requiresAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!hasUser(req)) {
                return res.status(404).json({ error: 'User not found' })
            }

            const user = await User.findOne({
                _id: req.user._id,
            })

            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            const newDeck = new Deck({
                user: user._id,
                cards: [],
            })

            await newDeck.save()

            return res.json(newDeck)
        } catch (error) {
            next(error)
        }
    }
)

// @route PUT /api/deck/add
// @desc Add a card to user's Deck
// @access Private
router.put(
    '/add',
    requiresAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!hasUser(req)) {
                return res.status(404).json({ error: 'User not found' })
            }

            const cardData = req.body

            const deck = await Deck.findOneAndUpdate(
                { user: req.user._id },
                { $push: { cards: cardData } },
                { new: true }
            )

            if (!deck) {
                return res.status(404).json({ error: 'User deck not found' })
            }

            return res.json(deck)
        } catch (error) {
            next(error)
        }
    }
)

// @route PUT /api/deck/:card_id/remove
// @desc Remove card from user's deck
// @access Private
router.put(
    '/:card_id/remove',
    requiresAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!hasUser(req)) {
                return res.status(404).json({ error: 'User not found' })
            }

            const deck = await Deck.findOneAndUpdate(
                { user: req.user._id },
                { $pull: { cards: { _id: req.params.card_id } } },
                { new: true }
            )

            if (!deck) {
                return res.status(404).json({ error: 'User deck not found' })
            }

            return res.json(deck)
        } catch (error) {
            next(error)
        }
    }
)

// @route PUT /api/deck/empty
// @desc Empty user's deck
// @access Private
router.put(
    '/empty',
    requiresAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!hasUser(req)) {
                return res.status(404).json({ error: 'User not found' })
            }

            const deck = await Deck.findOneAndUpdate(
                { user: req.user._id },
                { $set: { cards: [] } },
                { new: true }
            )

            if (!deck) {
                return res.status(404).json({ error: 'User deck not found' })
            }

            return res.json(deck)
        } catch (error) {
            next(error)
        }
    }
)

export default router
