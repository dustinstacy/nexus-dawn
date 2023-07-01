import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const requiresAuth = async (req, res, next) => {
    const token = req.cookies['access-token']
    let isAuthed = false

    if (token) {
        try {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(userId)

            if (user) {
                const userToReturn = { ...user._doc }
                delete userToReturn.password
                req.user = userToReturn
                isAuthed = true
            }
        } catch {
            isAuthed = false
        }
    }

    if (!isAuthed) {
        return res.status(401).send('Unauthorized')
    }

    return next()
}

export const requiresAdmin = async (req, res, next) => {
    try {
        const user = req.user

        if (user.role === 'admin') {
            return next()
        } else {
            return res.status(403).json({ error: 'Forbidden' }) // User is not authorized as an admin
        }
    } catch (error) {
        next(error)
    }
}
