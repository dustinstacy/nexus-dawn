import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../models/User.js'
import jwt, { Secret } from 'jsonwebtoken'
import { UserToReturn } from '../global.interface.js'

interface DecodedToken {
    userId: string
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
            const user = await User.findById(userId)

            if (user) {
                const userToReturn = { ...user.toJSON() } as UserToReturn
                delete userToReturn.password
                req.user = userToReturn as IUser
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
        const user = req.user as IUser

        if (user?.role === 'admin') {
            return next()
        } else {
            return res.status(403).json({ error: 'Forbidden' }) // User is not authorized as an admin
        }
    } catch (error) {
        next(error)
    }
}

// Type guard function to check if 'req.user' is defined and has IUser type
function hasUser(req: Request): req is Request & { user: IUser } {
    return !!req.user && req.user instanceof User
}

// Custom middleware to check if 'req.user' is defined and has IUser type
export function checkUser(req: Request, res: Response, next: NextFunction) {
    if (!hasUser(req)) {
        return res.status(404).json({ error: 'User not found' })
    }
    next()
}
