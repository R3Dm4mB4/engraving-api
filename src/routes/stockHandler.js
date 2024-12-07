import { Router } from 'express'
import {getCurrentStock, verifyStock} from "../controllers/engravablesController.js";

const router = Router()

router.get('/current_stock', getCurrentStock)
router.patch('/verify', verifyStock)

export default router