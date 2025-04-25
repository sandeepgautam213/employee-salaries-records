import { Router } from 'express'
import { distributePayroll,getPayrollHistory } from '../controller/payroll.controller'

const router = Router()

router.post('/distribute',distributePayroll)
router.get('/history', getPayrollHistory)

export default router
