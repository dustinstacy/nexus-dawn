import express, { Request, Response } from "express"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import authRoute from "./api/auth"
import cardsRoute from "./api/cards"
import collectionRoute from "./api/collection"
import deckRoute from "./api/deck"
import profileRoute from "./api/profile"
import cpuOpponentsRoute from "./api/cpuOpponents"
import itemsRoute from "./api/items"
import battleLogsRoute from "./api/battleLogs"
import errorHandler from "./errors/errorHandler"

dotenv.config()

const app = express()
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/cards", cardsRoute)
app.use("/api/collection", collectionRoute)
app.use("/api/deck", deckRoute)
app.use("/api/profile", profileRoute)
app.use("/api/cpuOpponents", cpuOpponentsRoute)
app.use("/api/items", itemsRoute)
app.use("/api/battleLogs", battleLogsRoute)
app.use(errorHandler)

app.get("/", (req: Request, res: Response) => {
    res.send("Server Running")
})

const MONGO_DEV_URI = process.env.MONGO_DEV_URI

if (typeof MONGO_DEV_URI !== "string") {
    throw new Error("MONGO_DEV_URI must be a valid string")
}

mongoose.set("strictQuery", true)
mongoose
    .connect(MONGO_DEV_URI)
    .then(() => {
        console.log("*****Connected to database*****")

        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
