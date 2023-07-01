import { Schema, model } from 'mongoose'

// base card schema for library display and pack openings
const BattleLogSchema = new Schema(
    {
        battleNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        battleLog: {
            type: String,
            required: true,
        },
    },
    {
        timestamp: true,
    }
)

const BattleLog = model('BattleLog', BattleLogSchema)

export default BattleLog
