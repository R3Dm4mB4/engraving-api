import express from 'express'
import { createServer } from 'node:http'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
const server = createServer(app)

// Module imports
import { router as mainRouter } from './routes/index.js'
import { MakeIo } from './utils/socketio.js'

// Main config
import db from './config/db.js'
import { env } from "./config/envConf.js";
MakeIo.setServer(server)
const PORT = env.PORT
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