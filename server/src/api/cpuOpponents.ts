import express, { Request, Response, NextFunction } from "express"

import { requiresAuth, requiresAdmin } from "../middleware/permissions"
import CPUOpponent from "../models/CPUOpponent"

const router = express.Router()

// @route GET /api/cpuOpponents/test
// @desc Test the CPU Opoonent route
// @access Public
router.get("/test", (req: Request, res: Response) => {
    res.send("CPU Opponent route working")
})

// @route GET /api/cpuOpponents
// @desc Get CPU Opponent
// @access Private
router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cpuOpponents = await CPUOpponent.find()

        res.json(cpuOpponents)
        return
    } catch (error) {
        next(error)
    }
})

// @route POST /api/cpuOpponents/
// @route Add CPU Opponent
// @access Private
router.post(
    "/",
    requiresAuth,
    requiresAdmin,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            res.json(newCPUOpponent)
            return
        } catch (error) {
            next(error)
        }
    }
)

// @route PUT /api/cpuOpponents/:cpuOpponent_id
// @desc Update CPU Opponent
// @access Private
router.put(
    "/:cpuOpponent_id",
    requiresAuth,
    requiresAdmin,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
                res.status(404).json({ error: "CPU Opponent not found" })
                return
            }

            res.json(cpuOpponent)
            return
        } catch (error) {
            next(error)
        }
    }
)

// @route DELETE /api/cpuOpponents/:cpuOpponentId
// @desc Remove CPU Opponent
// @access Private
router.delete(
    "/:cpuOpponentId",
    requiresAuth,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const cpuOpponent = await CPUOpponent.findOne({
                _id: req.params.cpuOpponentId,
            })

            if (!cpuOpponent) {
                res.status(404).json({ error: "CPU Opponent not found" })
                return
            }

            await CPUOpponent.findByIdAndDelete({
                _id: req.params.cpuOpponentId,
            })

            res.json({ success: true })
            return
        } catch (error) {
            next(error)
        }
    }
)

export default router
