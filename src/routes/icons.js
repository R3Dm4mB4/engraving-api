import { Router } from 'express'
import { getAllIcons, registerIcon } from '../controllers/iconsController.js'
import { auth, authorized } from '../middlewares/authorize.js'
const router = Router()

router.get('/all', [auth, authorized('admin', 'employee')], getAllIcons)
router.post('/create', [auth, authorized('admin')], registerIcon)

export default router