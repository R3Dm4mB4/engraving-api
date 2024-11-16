import { Router } from 'express'
import { auth, authorized } from '../middlewares/authorize.js'
import upload from '../middlewares/multer.js'
import { getAllJobs, getJobsByDate, createJob, updateJob } from '../controllers/jobsController.js'
import { newProduct, updateProduct, getProducts } from '../controllers/engravablesController.js'
const router = Router()

// List all jobs, or apply filters
router.get('/jobs/all', [auth, authorized('admin', 'employee'), upload.array('images', 3)], getAllJobs)
router.get('/jobs/query/date', [auth, authorized('admin', 'employee')], getJobsByDate)
router.post('/jobs/register', upload.array('images', 3), createJob)
router.patch('/jobs/update', updateJob)

// Upload engravable items
router.post('/engravables/register', [auth, authorized('admin'), upload.array('images', 3)], newProduct)
router.patch('/engravables/update', [auth, authorized('admin'), upload.array('image', 3)], updateProduct)
router.get('/engravables/all', getProducts)

export default router