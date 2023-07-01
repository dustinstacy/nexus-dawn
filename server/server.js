import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import authRoute from './routes/auth.js'
import cardsRoute from './routes/cards.js'
import collectionRoute from './routes/collection.js'
import deckRoute from './routes/deck.js'
import profileRoute from './routes/profile.js'
import cpuOpponentsRoute from './routes/cpuOpponents.js'
import itemsRoute from './routes/items.js'
import battleLogsRoute from './routes/battleLogs.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/cards', cardsRoute)
app.use('/api/collection', collectionRoute)
app.use('/api/deck', deckRoute)
app.use('/api/profile', profileRoute)
app.use('/api/cpuOpponents', cpuOpponentsRoute)
app.use('/api/items', itemsRoute)
app.use('/api/battleLogs', battleLogsRoute)
app.use(errorHandler)

app.use(express.static(path.resolve(__dirname, '../client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

app.get('/', (req, res) => {
    res.send('Server Running')
})

mongoose.set('strictQuery', true)
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('*****Connected to database*****')

        app.listen(process.env.PORT, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            )
        })
    })
    .catch((error) => {
        console.log(error)
    })
