import { IUser } from './models/User'

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export interface UserToReturn extends Omit<IUser, 'password'> {
    password?: string
}

export type AuthenticatedUser = IUser & { password?: never }
