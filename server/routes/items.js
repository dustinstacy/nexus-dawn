import express from 'express'
import { requiresAuth, requiresAdmin } from '../middleware/permissions.js'
import Item from '../models/Item.js'

const router = express.Router()

// @route GET /api/items/test
// @desc Test the items route
// @access Public
router.get('/test', (req, res) => {
    res.send('Items route working')
})

// @route GET /api/items
// @desc Get all items
// @access Private
router.get('/', requiresAuth, async (req, res, next) => {
    try {
        const items = await Item.find()

        return res.json(items)
    } catch (error) {
        next(error)
    }
})

// @route POST /api/items/
// @desc Add item to database
// @access Private
router.post('/', requiresAuth, requiresAdmin, async (req, res, next) => {
    try {
        const { name, image, type, level, info, price, contents } = req.body

        const newItem = new Item({
            name: name,
            image: image,
            type: type,
            level: level,
            info: info,
            price: price,
            contents: contents,
        })

        await newItem.save()
        return res.json(newItem)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/items/:itemId
// @desc Update item in database
// @access Private
router.put('/:itemId', requiresAuth, requiresAdmin, async (req, res, next) => {
    try {
        const { name, image, type, level, info, price, contents } = req.body

        const item = await Item.findOneAndUpdate(
            {
                _id: req.params.itemId,
            },
            {
                name: name,
                image: image,
                type: type,
                level: level,
                info: info,
                price: price,
                contents: contents,
            },
            {
                new: true,
            }
        )

        if (!item) {
            return res.status(404).json({ error: 'Item not found' })
        }

        return res.json(item)
    } catch (error) {
        next(error)
    }
})

// @route DELETE /api/items/:itemId
// @desc Remove item from database
// @access Private
router.delete(
    '/:itemId/remove',
    requiresAuth,
    requiresAdmin,
    async (req, res, next) => {
        try {
            const item = await Item.findOne({
                _id: req.params.itemId,
            })

            if (!item) {
                return res.status(404).json({ error: 'Item not found' })
            }

            await Item.findByIdAndRemove({
                _id: req.params.itemId,
            })

            return res.json({ success: true })
        } catch (error) {
            next(error)
        }
    }
)

export default router
