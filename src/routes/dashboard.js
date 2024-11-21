import { Router } from 'express'
import { auth, authorized } from '../middlewares/authorize.js'
import upload from '../middlewares/multer.js'
import { getAllJobs, getJobsByDate, createJob, updateJob } from '../controllers/jobsController.js'
import { newProduct, updateProduct, getProducts, deleteProduct } from '../controllers/engravablesController.js'
import { getSalesReps, registerSalesRep } from '../controllers/salesRepsController.js'
const router = Router()

// List all jobs, or apply filters
router.get('/jobs/all', [auth, authorized('admin', 'employee'), upload.array('images', 3)], getAllJobs)
router.get('/jobs/query/date', [auth, authorized('admin', 'employee')], getJobsByDate)
router.post('/jobs/register', createJob)
router.patch('/jobs/update', updateJob)

// Upload engravable items
router.post('/engravables/register', [auth, authorized('admin'), upload.array('images')], newProduct)
router.put('/engravables/update', [auth, authorized('admin'), upload.array('images')], updateProduct)
router.delete('/engravables/delete', [auth, authorized('admin')], deleteProduct)
router.get('/engravables/all', getProducts)

// Control of sales reps
router.get('/sales_reps/all', getSalesReps)
router.post('/sales_reps/register', [auth, authorized('admin')], registerSalesRep)

export default router