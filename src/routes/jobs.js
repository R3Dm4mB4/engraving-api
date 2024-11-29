import { Router } from 'express'
import { auth, authorized } from '../middlewares/authorize.js'
import { getAllJobs, createJob, updateJob } from '../controllers/jobsController.js'

const router = Router()

router.get('/all', [auth, authorized('admin', 'employee')], getAllJobs)
router.post('/register', createJob)
router.patch('/update', [auth, authorized('admin', 'employee')], updateJob)

export default router