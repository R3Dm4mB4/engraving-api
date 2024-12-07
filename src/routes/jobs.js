import { Router } from 'express'
import { auth, authorized } from '../middlewares/authorize.js'
import {getAllJobs, createJob, updateJob, updateJobStatus} from '../controllers/jobsController.js'

const router = Router()

router.get('/all', [auth, authorized('admin', 'employee')], getAllJobs)
router.post('/register', createJob)
router.patch('/update', [auth, authorized('admin', 'employee')], updateJob)
router.patch('/update_job_status', [auth, authorized('admin', 'employee')], updateJobStatus)

export default router