import express, { NextFunction, Request, Response } from "express"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

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
const MONGO_DEV_URI =
    "mongodb+srv://cloudwalker0013:A3GeYLhO5pOjF6nc@development-data.e0khqcy.mongodb.net/?retryWrites=true&w=majority&appName=Development-Data"

app.use((req: Request, res: Response, next: NextFunction): void => {
    // Allow specific origin for CORS
    const allowedOrigin = "https://nexus-dawn.vercel.app"
    res.header("Access-Control-Allow-Origin", allowedOrigin) // Replace "*" with specific allowed origin

    // Allow specific headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    // Handle pre-flight OPTIONS request
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE")
        res.status(200).json({})
        return
    }

    // Allow credentials if you're using cookies or sessions
    res.header("Access-Control-Allow-Credentials", "true") // Allow credentials like cookies if needed

    next()
})

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

mongoose.set("strictQuery", true)
mongoose
    .connect(process.env.MONGO_URI || MONGO_DEV_URI)
    .then(() => {
        console.log("*****Connected to database*****")

        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:5000`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
