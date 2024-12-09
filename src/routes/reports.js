import { Router } from "express"
const router = Router()
import { authorized, auth } from "../middlewares/authorize.js"
import { getDayReport } from "../controllers/reportsController.js";

router.get('/reports/admin', [auth, authorized('admin')], getDayReport)

// * Integrate to API later
