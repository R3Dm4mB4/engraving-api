import express from 'express'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
const server = createServer(app)

// Module imports
import { router as mainRouter } from './routes/index.js'
import { MakeIo } from './utils/socketio.js'
dotenv.config()

// Main config
import db from './config/db.js'
MakeIo.setServer(server)
const PORT = process.env.PORT | 3000
app.use(express.json())

// Middlewares
app.use(morgan('combined'))
app.use(cors({
  origin: "*"
}))

// Routes
app.use('/api/v1', mainRouter)


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})