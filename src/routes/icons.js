import { Router } from 'express'
import { getAllIcons, registerIcon } from '../controllers/iconsController.js'
import { auth, authorized } from '../middlewares/authorize.js'
import upload from '../middlewares/multer.js'

const router = Router()

router.get('/all', [auth, authorized('admin', 'employee')], getAllIcons)
router.post('/create', [auth, authorized('admin'), upload.single('image')], registerIcon)

export default router