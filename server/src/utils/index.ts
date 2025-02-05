import { Request } from "express"
import { IUser } from "../models/User"

// Type guard function to check if 'req.user' is defined and has IUser type
export const hasUser = (req: Request): req is Request & { user: IUser } => {
    return !!req.user
}
