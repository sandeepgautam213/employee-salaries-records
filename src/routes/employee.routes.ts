import { Router } from "express";

import { createEmployee,getEmployee } from "../controller/employee.controller";

const router = Router()
router.post('/',createEmployee)
router.get('/:id',getEmployee)

export default router