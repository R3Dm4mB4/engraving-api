import { Router } from 'express'
import { auth, authorized } from '../middlewares/authorize.js'
import { getSalesReps, registerSalesRep } from '../controllers/salesRepsController.js'

const router = Router()

router.get('/all', getSalesReps)
router.post('/register', [auth, authorized('admin')], registerSalesRep)

export default router