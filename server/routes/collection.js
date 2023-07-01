import express from 'express'
import { requiresAuth } from '../middleware/permissions.js'
import Collection from '../models/Collection.js'
import User from '../models/User.js'

const router = express.Router()

// @route GET /api/collection/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
    res.send('Collection route working')
})

// @route GET /api/collection
// @desc Get user's Collection
// @access Private
router.get('/', requiresAuth, async (req, res, next) => {
    try {
        const collection = await Collection.findOne({
            user: req.user._id,
        }).lean()

        return res.json(collection)
    } catch (error) {
        next(error)
    }
})

// @route POST /api/collection
// @route Create new user Collection
// @access Private
router.post('/', requiresAuth, async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user._id,
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const newCollection = new Collection({
            user: user._id,
            cards: [],
        })

        await newCollection.save()

        return res.json(newCollection)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/collection/new
// @route Add a new card to user's Collection
// @access Private
router.put('/new', requiresAuth, async (req, res, next) => {
    try {
        const cardData = req.body

        const collection = await Collection.findOneAndUpdate(
            { user: req.user._id },
            { $push: { cards: cardData } },
            { new: true }
        )

        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' })
        }

        return res.json(collection)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/collection/:cardId/:action
// @desc Update a card in user's Collection
// @access Private
router.put('/:cardId/:action', requiresAuth, async (req, res, next) => {
    try {
        const collection = await Collection.findOne({
            user: req.user._id,
        })

        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' })
        }

        const card = collection.cards.find(
            (card) => card._id.toString() === req.params.cardId
        )

        if (!card) {
            return res.status(404).json({ error: 'Card not found' })
        }

        switch (req.params.action) {
            case 'update':
                card.values = req.body.values
                card.empower = req.body.empower
                card.weaken = req.body.weaken
                card.xp = req.body.xp
                card.level = req.body.level
                card.timesPlayed = req.body.timesPlayed
                card.enemiesConverted = req.body.enemiesConverted
                await collection.save()
                return res.json(card)
            case 'select':
                if (card.selected) {
                    return res
                        .status(400)
                        .json({ error: 'Card already selected' })
                }
                card.selected = true
                await collection.save()
                return res.json(collection)
            case 'unselect':
                if (!card.selected) {
                    return res
                        .status(400)
                        .json({ error: 'Card already unselected' })
                }
                card.selected = false
                await collection.save()
                return res.json(collection)
            default:
                return res.status(400).json({ error: 'Invalid action' })
        }
    } catch (error) {
        next(error)
    }
})

// @route DELETE /api/collection/:cardId/delete
// @desc Remove card from user's collection
// @access Private
router.delete('/:cardId/delete', requiresAuth, async (req, res, next) => {
    try {
        const collection = await Collection.findOne({
            user: req.user._id,
        })

        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' })
        }

        const cardIndex = collection.cards.findIndex(
            (card) => card._id.toString() === req.params.cardId
        )

        if (cardIndex === -1) {
            return res.status(404).json({ error: 'Card not found' })
        }

        collection.cards.splice(cardIndex, 1)

        await collection.save()

        return res.json({ success: true })
    } catch (error) {
        next(error)
    }
})

export default router
