declare global {
    namespace Express {
        interface Request {
            user?: UserInterface
        }
    }
}

interface Document<T> {
    _doc: T
}

export interface UserInterface extends Document<UserInterface> {
    role: string
    username: string
    email: string
    password: string
    image: string
    color: string
    level: number
    xp: number
    stats: UserStats
    activeBattle: boolean
    coin: number
    inventory: Array<Item>
    onboardingStage: number
    createdAt: Date
    updatedAt: Date
}

interface UserStats {
    battles: number
    wins: number
    losses: number
    draws: number
}

interface Item {
    contents: ItemContents
    image: string
    info: string
    level: number
    name: string
    price: number
    type: string
    _id: string
}

interface ItemContents {
    count: number
    odds: any
}
