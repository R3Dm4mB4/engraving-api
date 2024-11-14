import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
import router from './routes/dashboard.js'
import authRouter from './routes/auth.js'
dotenv.config()

// Main config
import db from './config/db.js'
const PORT = process.env.PORT | 3000
app.use(express.json())

// Middlewares
app.use(morgan('combined'))
app.use(cors({
  origin: "*"
}))

// Routes
app.use('/api/v1', router)
app.use('/auth', authRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})