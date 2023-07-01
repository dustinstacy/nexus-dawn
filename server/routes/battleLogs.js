import express from 'express'
import BattleLog from '../models/BattleLog.js'

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

// @route POST /api/battleLogs
// @route Add Battle Log
// @access Public
router.post('/', async (req, res, next) => {
    try {
        const { battleLog } = req.body

        const logCountQuery = BattleLog.countDocuments()
        const logCount = await logCountQuery.exec()
        const nextBattleNumber = Number(logCount) + 1

        // Parse battleLog into an object
        const parsedBattleLog = JSON.parse(battleLog)

        // Remove 'image' properties
        removeImageProperties(parsedBattleLog)

        // Stringify the modified battleLog
        const stringifiedBattleLog = JSON.stringify(parsedBattleLog)

        const newBattleLog = new BattleLog({
            battleNumber: nextBattleNumber,
            battleLog: stringifiedBattleLog,
        })

        await newBattleLog.save()
        return res.json(newBattleLog)
    } catch (error) {
        next(error)
    }
})

// Helper function to remove 'image' properties recursively
function removeImageProperties(obj) {
    for (let key in obj) {
        if (key === 'image') {
            delete obj[key]
        } else if (typeof obj[key] === 'object') {
            removeImageProperties(obj[key])
        }
    }
}

export default router
