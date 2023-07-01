import { Schema, model } from 'mongoose'

const CPUOpponentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: '#9e0e24',
        },
        level: {
            type: Number,
            required: true,
        },
        deckOdds: {
            type: Object,
            required: true,
        },
        cardCount: {
            type: Number,
            required: true,
        },
        minPower: {
            type: Number,
            required: true,
        },
        maxPower: {
            type: Number,
            required: true,
        },
        rules: {
            type: Array,
            required: true,
        },
        rounds: {
            type: Number,
            required: true,
        },
        rewards: {
            xp: {
                type: Number,
                required: true,
            },
            coin: {
                type: Number,
                required: true,
            },
            items: [],
        },
    },
    {
        timestamps: true,
    }
)

// export the model
const CPUOpponent = model('CPUOpponent', CPUOpponentSchema)

export default CPUOpponent
