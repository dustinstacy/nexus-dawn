import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { requiresAuth } from '../middleware/permissions.js'
import {
    validateRegisterInput,
    checkForExistingEmail,
    checkForExistingUsername,
} from '../validation/registerValidation.js'
import User from '../models/User.js'

const router = express.Router()

// Generate and set the access token cookie
const setAccessTokenCookie = (res, token) => {
    res.cookie('access-token', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
    })
}

// @route GET /api/auth/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
    res.send('Auth route working')
})

// @route POST /api/auth/register
// @desc Create a new user
// @access Public
router.post(
    '/register',
    checkForExistingEmail,
    checkForExistingUsername,
    async (req, res, next) => {
        try {
            const { errors, isValid } = validateRegisterInput(req.body)

            if (!isValid) {
                return res.status(400).json(errors)
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            })

            const savedUser = await newUser.save()
            const payload = { userId: savedUser._id }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '7d',
            })
            setAccessTokenCookie(res, token)

            const userToReturn = { ...savedUser._doc }
            delete userToReturn.password
            return res.json(userToReturn)
        } catch (error) {
            next(error)
        }
    }
)

// @route Post /api/auth/login
// @desc Login user and return an access token
// @access Public
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: new RegExp('^' + req.body.username + '$', 'i'),
        })
        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' })
        }

        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' })
        }

        const payload = { userId: user._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })
        setAccessTokenCookie(res, token)

        const userToReturn = { ...user._doc }
        delete userToReturn.password
        return res.json({
            token: token,
            user: userToReturn,
        })
    } catch (error) {
        next(error)
    }
})

// @route Get /api/auth/current
// @desc Return currently authed user
// @access Private
router.get('/current', requiresAuth, (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        return res.json(req.user)
    } catch (error) {
        next(error)
    }
})

// @route Put /api/auth/logout
// @desc Logout user and clear the cookie
// @access Private
router.put('/logout', requiresAuth, async (req, res, next) => {
    try {
        res.clearCookie('access-token')
        return res.json({ success: true })
    } catch (error) {
        next(error)
    }
})

export default router
