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

app.use((req: Request, res: Response, next: NextFunction) => {
    const allowedOrigin = "https://nexus-dawn.vercel.app" // Set allowed origin
    res.header("Access-Control-Allow-Origin", allowedOrigin) // Set the correct origin

    // Allow credentials (cookies, HTTP authentication)
    res.header("Access-Control-Allow-Credentials", "true")

    // Allow specific headers (this is where your Authorization, Content-Type, etc. go)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    // Allow methods like POST, GET, PUT, DELETE, etc.
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE")

    // Handle pre-flight OPTIONS request
    if (req.method === "OPTIONS") {
        res.status(200).json({})
        return
    }

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
