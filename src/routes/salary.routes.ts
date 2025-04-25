import {Router} from 'express'

import { calculateSalary } from '../controller/salary.controller'

const router = Router()
router.post('/calculate',calculateSalary)

export default router
