import express, { Request, Response, NextFunction } from 'express'
import BattleLog from '../models/BattleLog.ts'

const router = express.Router()

// @route GET /api/battleLogs/test
// @desc Test the Battle Logs route
// @access Public
router.get('/test', (req: Request, res: Response) => {
    res.send('Battle Logs route working')
})

// @route GET /api/battleLogs
// @desc Get Battle Logs
// @access Public
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const battleLogs = await BattleLog.find()

        return res.json(battleLogs)
    } catch (error) {
        next(error)
    }
})

// @route GET /api/battleLogs/battleNumber
// @desc Get current Battle Log number
// @access Public
router.get(
    '/battleNumber',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const battleNumber = await getCurrentBattleNumber()

            return res.json({ battleNumber })
        } catch (error) {
            next(error)
        }
    }
)

// @route POST /api/battleLogs
// @route Add Battle Log
// @access Public
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { battleLog } = req.body

        // Get current battle number by querying the database
        const battleNumber = await getCurrentBattleNumber()

        // Parse battleLog into an object
        const parsedBattleLog = JSON.parse(battleLog)

        // Remove 'image' properties
        removeImageProperties(parsedBattleLog)

        // Stringify the modified battleLog
        const stringifiedBattleLog = JSON.stringify(parsedBattleLog)

        const newBattleLog = new BattleLog({
            battleNumber: battleNumber,
            battleLog: stringifiedBattleLog,
        })

        await newBattleLog.save()
        return res.json(newBattleLog)
    } catch (error) {
        next(error)
    }
})

// Helper function to query the database and incremenet the total document count by 1
const getCurrentBattleNumber = async () => {
    const logCountQuery = BattleLog.countDocuments()
    const logCount = await logCountQuery.exec()
    const battleNumber = Number(logCount) + 1
    return battleNumber
}

// Helper function to remove 'image' properties recursively
const removeImageProperties = (obj: object) => {
    for (let key in obj) {
        if (key === 'image') {
            delete obj[key as keyof object]
        } else if (typeof obj[key as keyof object] === 'object') {
            removeImageProperties(obj[key as keyof object])
        }
    }
}

export default router
