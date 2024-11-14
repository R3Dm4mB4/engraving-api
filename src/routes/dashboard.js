import { Router } from 'express'
import { auth, authorized } from '../middlewares/authorize.js'
import { getAllJobs, getJobsByDate, createJob, updateJob } from '../controllers/jobsController.js'
import { newProduct, updateProduct, getProducts } from '../controllers/engravablesController.js'
const router = Router()

// List all jobs, or apply filters
router.get('/jobs/all', auth, authorized('admin', 'employee'), getAllJobs)
router.get('/jobs/query/date', auth, authorized('admin', 'employee'), getJobsByDate)
router.post('/jobs/register', createJob)
router.patch('/jobs/update', updateJob)

// Upload engravable items
router.post('/engravables/register', auth, authorized('admin'), newProduct)
router.patch('/engravables/update', auth, authorized('admin'), updateProduct)
router.get('/engravables/all', getProducts)

export default router