import { Router } from 'express'
import { auth, authorized } from '../middlewares/authorize.js'
import { newProduct, updateProduct, getProducts, deleteProduct } from '../controllers/engravablesController.js'
import upload from '../middlewares/multer.js'

const router = Router()

router.post('/register', [auth, authorized('admin'), upload.array('images')], newProduct)
router.put('/update', [auth, authorized('admin'), upload.array('images')], updateProduct)
router.delete('/delete', [auth, authorized('admin')], deleteProduct)
router.get('/all', getProducts)

export default router