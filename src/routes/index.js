import { Router } from 'express'
import authRoutes from './auth.js'
import jobsRoutes from './jobs.js'
import engravablesRoutes from './engravables.js'
import salesRepsRoutes from './salesReps.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/jobs', jobsRoutes)
router.use('/engravables', engravablesRoutes)
router.use('/sales_reps', salesRepsRoutes)

export { router }