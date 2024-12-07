import { Router } from 'express'
import authRoutes from './auth.js'
import iconsRoutes from './icons.js'
import jobsRoutes from './jobs.js'
import engravablesRoutes from './engravables.js'
import salesRepsRoutes from './salesReps.js'
import stockHandler from './stockHandler.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/icons', iconsRoutes)
router.use('/jobs', jobsRoutes)
router.use('/engravables', engravablesRoutes)
router.use('/sales_reps', salesRepsRoutes)
router.use('/stock', stockHandler)

export { router }