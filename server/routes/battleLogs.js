import express from 'express'
import BattleLog from '../models/BattleLog.ts'

const router = express.Router()

// @route GET /api/battleLogs/test
// @desc Test the Battle Logs route
// @access Public
router.get('/test', (req, res) => {
    res.send('Battle Logs route working')
})

// @route GET /api/battleLogs
// @desc Get Battle Logs
// @access Public
router.get('/', async (req, res, next) => {
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
router.get('/battleNumber', async (req, res, next) => {
    try {
        const battleNumber = await getCurrentBattleNumber()

        return res.json({ battleNumber })
    } catch (error) {
        next(error)
    }
})

// @route POST /api/battleLogs
// @route Add Battle Log
// @access Public
router.post('/', async (req, res, next) => {
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
const removeImageProperties = (obj) => {
    for (let key in obj) {
        if (key === 'image') {
            delete obj[key]
        } else if (typeof obj[key] === 'object') {
            removeImageProperties(obj[key])
        }
    }
}

export default router
