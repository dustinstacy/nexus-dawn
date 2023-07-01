import express from 'express'
import { requiresAuth } from '../middleware/permissions.js'
import {
    checkForExistingEmail,
    checkForExistingUsername,
    validateRegisterInput,
} from '../validation/registerValidation.js'
import User from '../models/User.js'

const router = express.Router()

// @route GET /api/profile/test
// @desc Test the profile route
// @access Public
router.get('/test', (req, res) => {
    res.send('Auth route working')
})

// @route PUT /api/profile/:action
// @desc Update user's profile
// @access Private
router.put(
    '/:action',
    requiresAuth,
    checkForExistingEmail,
    checkForExistingUsername,
    async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.user._id })
            const {
                role,
                username,
                email,
                image,
                color,
                defeatedEnemies,
                activeBattle,
                coin,
                runes,
                level,
                xp,
                battles,
                wins,
                losses,
                draws,
                inventory,
                onboardingStage,
            } = req.body
            const { errors, isValid } = validateRegisterInput(req.body)

            if (!isValid) {
                return res.status(400).json(errors)
            }

            let updatedFields = {}
            switch (req.params.action) {
                case 'info':
                    updatedFields = {
                        role: role || user.role,
                        username: username || user.username,
                        email: email || user.email,
                        image: image || user.image,
                        color: color || user.color,
                        defeatedEnemies:
                            defeatedEnemies || user.defeatedEnemies,
                        activeBattle: activeBattle || user.activeBattle,
                        coin: coin || user.coin,
                        runes: runes || user.runes,
                    }
                    break
                case 'stats':
                    updatedFields = {
                        level: level || user.level,
                        xp: xp || user.xp,
                        stats: {
                            battles: battles || user.stats.battles,
                            wins: wins || user.stats.wins,
                            losses: losses || user.stats.losses,
                            draws: draws || user.stats.draws,
                        },
                    }
                    break
                case 'inventory':
                    updatedFields = {
                        inventory: inventory,
                    }
                    break
                case 'onboarding':
                    updatedFields = {
                        onboardingStage: onboardingStage,
                    }
                    break
                default:
                    return res.status(400).json({ error: 'Invalid action' })
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.user._id },
                updatedFields,
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            return res.json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
)

export default router
