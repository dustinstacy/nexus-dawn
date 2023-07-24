import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    role: string
    username: string
    email: string
    password: string
    image: string
    color: string
    level: number
    xp: number
    stats: {
        battles: number
        wins: number
        losses: number
        draws: number
    }
    activeBattle: boolean
    coin: number
    inventory: any[] // Replace 'any' with the specific type of items in the inventory, if known
    onboardingStage: number
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema(
    {
        role: {
            type: String,
            default: 'player',
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default:
                'https://res.cloudinary.com/dsv7k92lb/image/upload/v1687989560/Nexus%20Dawn/avatars/magus2_vizmyl.jpg',
        },
        color: {
            type: String,
            default: '#03303b',
        },

        level: {
            type: Number,
            default: 1,
        },
        xp: {
            type: Number,
            default: 0,
        },
        stats: {
            battles: {
                type: Number,
                default: 0,
            },
            wins: {
                type: Number,
                default: 0,
            },
            losses: {
                type: Number,
                default: 0,
            },
            draws: {
                type: Number,
                default: 0,
            },
        },
        activeBattle: {
            type: Boolean,
            default: false,
        },
        coin: {
            type: Number,
            default: 0,
        },
        inventory: [],
        onboardingStage: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

// export the model
const User = model<IUser>('User', UserSchema)

export default User
