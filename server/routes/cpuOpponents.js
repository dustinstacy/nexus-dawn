import express from 'express'
import { requiresAuth, requiresAdmin } from '../middleware/permissions.js'
import CPUOpponent from '../models/CPUOpponent.js'

const router = express.Router()

// @route GET /api/cpuOpponents/test
// @desc Test the CPU Opoonent route
// @access Public
router.get('/test', (req, res) => {
    res.send('CPU Opponent route working')
})

// @route GET /api/cpuOpponents
// @desc Get CPU Opponent
// @access Private
router.get('/', requiresAuth, async (req, res, next) => {
    try {
        const cpuOpponents = await CPUOpponent.find()

        return res.json(cpuOpponents)
    } catch (error) {
        next(error)
    }
})

// @route POST /api/cpuOpponents/
// @route Add CPU Opponent
// @access Private
router.post('/', requiresAuth, requiresAdmin, async (req, res, next) => {
    try {
        const {
            name,
            image,
            color,
            level,
            deckOdds,
            minPower,
            maxPower,
            minDeckSize,
            rewards: { xp, coin, card, items },
        } = req.body

        const newCPUOpponent = new CPUOpponent({
            name: name,
            image: image,
            color: color,
            level: level,
            deckOdds: deckOdds,
            minPower: minPower,
            maxPower: maxPower,
            minDeckSize: minDeckSize,
            rewards: {
                xp: xp,
                coin: coin,
                card: card,
                items: items,
            },
        })

        await newCPUOpponent.save()
        return res.json(newCPUOpponent)
    } catch (error) {
        next(error)
    }
})

// @route PUT /api/cpuOpponents/:cpuOpponent_id
// @desc Update CPU Opponent
// @access Private
router.put(
    '/:cpuOpponent_id',
    requiresAuth,
    requiresAdmin,
    async (req, res, next) => {
        try {
            const {
                name,
                image,
                color,
                level,
                deckOdds,
                minPower,
                maxPower,
                minDeckSize,
                rewards: { xp, coin, card, items },
            } = req.body

            const cpuOpponent = await CPUOpponent.findOneAndUpdate(
                {
                    _id: req.params.cpuOpponent_id,
                },
                {
                    name: name,
                    image: image,
                    color: color,
                    level: level,
                    deckOdds: deckOdds,
                    minPower: minPower,
                    maxPower: maxPower,
                    minDeckSize: minDeckSize,
                    rewards: {
                        xp: xp,
                        coin: coin,
                        card: card,
                        items: items,
                    },
                },
                {
                    new: true,
                }
            )

            if (!cpuOpponent) {
                return res.status(404).json({ error: 'CPU Opponent not found' })
            }

            return res.json(cpuOpponent)
        } catch (error) {
            next(error)
        }
    }
)

// @route DELETE /api/cpuOpponents/:cpuOpponentId
// @desc Remove CPU Opponent
// @access Private
router.delete('/:cpuOpponentId', requiresAuth, async (req, res, next) => {
    try {
        const cpuOpponent = await CPUOpponent.findOne({
            _id: req.params.cpuOpponentId,
        })

        if (!cpuOpponent) {
            return res.status(404).json({ error: 'CPU Opponent not found' })
        }

        await CPUOpponent.findByIdAndRemove({
            _id: req.params.cpuOpponentId,
        })

        return res.json({ success: true })
    } catch (error) {
        next(error)
    }
})

export default router
