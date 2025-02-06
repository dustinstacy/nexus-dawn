import express, { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt, { Secret } from "jsonwebtoken"

import { requiresAuth } from "../middleware/permissions"
import {
    validateRegisterInput,
    checkForExistingEmail,
    checkForExistingUsername,
} from "../middleware/registerValidation"
import User, { IUser } from "../models/User"
import { UserToReturn } from "../../global.interface"

const router = express.Router()

// Generate and set the access token cookie
const setAccessTokenCookie = (res: Response, token: string) => {
    res.cookie("access-token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: false,
        sameSite: "none",
    })
}

// @route GET /api/auth/test
// @desc Test the auth route
// @access Public
router.get("/test", (req: Request, res: Response) => {
    res.send("Auth route working")
})

// @route POST /api/auth/register
// @desc Create a new user
// @access Public
router.post(
    "/register",
    checkForExistingEmail,
    checkForExistingUsername,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { errors, isValid } = validateRegisterInput(req.body)

            if (!isValid) {
                res.status(400).json(errors)
                return
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            })

            const savedUser = (await newUser.save()) as IUser

            const payload = { userId: savedUser._id }
            const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, {
                expiresIn: "7d",
            })
            setAccessTokenCookie(res, token)

            const userToReturn = { ...savedUser.toJSON() } as UserToReturn
            delete userToReturn.password
            res.json(userToReturn)
            return
        } catch (error) {
            next(error)
        }
    }
)

// @route Post /api/auth/login
// @desc Login user and return an access token
// @access Public
router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = (await User.findOne({
            username: new RegExp("^" + req.body.username + "$", "i"),
        })) as IUser

        if (!user) {
            res.status(400).json({ error: "Invalid login credentials" })
            return
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!passwordMatch) {
            res.status(400).json({ error: "Invalid login credentials" })
            return
        }

        const payload = { userId: user._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, {
            expiresIn: "7d",
        })
        setAccessTokenCookie(res, token)

        const userToReturn = { ...user.toJSON() } as UserToReturn
        delete userToReturn.password
        res.json({
            token: token,
            user: userToReturn,
        })
        return
    } catch (error) {
        next(error)
    }
})

// @route Get /api/auth/current
// @desc Return currently authed user
// @access Private
router.get("/current", requiresAuth, (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req)
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" })
            return
        }
        res.json(req.user)
        return
    } catch (error) {
        next(error)
    }
})

// @route Put /api/auth/logout
// @desc Logout user and clear the cookie
// @access Private
router.put("/logout", requiresAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("access-token")
        res.json({ success: true })
        return
    } catch (error) {
        next(error)
    }
})

export default router
