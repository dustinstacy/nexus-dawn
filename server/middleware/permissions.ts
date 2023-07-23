import { Request, Response, NextFunction } from 'express'
import User from '../models/User.js'
import jwt, { Secret } from 'jsonwebtoken'
import { UserInterface } from '../global.interface.js'

interface DecodedToken {
    userId: string
}

interface UserToReturn extends Omit<UserInterface, 'password'> {
    password?: string
}

export const requiresAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies['access-token']
    let isAuthed = false

    if (token) {
        try {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET environment variable is not set.')
            }

            const { userId } = jwt.verify(
                token,
                process.env.JWT_SECRET as Secret
            ) as DecodedToken
            const user = (await User.findById(userId)) as UserInterface

            if (user) {
                const userToReturn: UserToReturn = { ...user._doc }
                delete userToReturn.password
                req.user = userToReturn as UserInterface
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

export const requiresAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user as UserInterface

        if (user.role === 'admin') {
            return next()
        } else {
            return res.status(403).json({ error: 'Forbidden' }) // User is not authorized as an admin
        }
    } catch (error) {
        next(error)
    }
}
