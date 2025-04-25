import { Router } from "express";

import { markAttendance } from "../controller/attendance.controller";

const router = Router()
router.post('/mark',markAttendance)
export default router