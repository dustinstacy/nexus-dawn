import { Schema, model } from 'mongoose'

// base card schema for library display and pack openings
const CardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        rarity: {
            type: String,
            required: true,
        },
        empower: {
            type: String,
        },
        weaken: {
            type: String,
        },
    },
    {
        timestamp: true,
    }
)

const Card = model('Card', CardSchema)

export default Card
