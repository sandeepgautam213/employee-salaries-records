import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import dotenv from 'dotenv'
import attendanceRoutes from './routes/attendance.routes'
import salaryRoutes from './routes/salary.routes'
import payrollRoutes from './routes/payroll.routes'
import employeeRoutes from './routes/employee.routes'

dotenv. config()

const app = express()

app.use(express.json())
app.use(cookieParser())




app.use('/auth',authRoutes)

app.use('/attendance',attendanceRoutes)
app.use('/salary',salaryRoutes)
app.use('/payroll',payrollRoutes)
app.use('/employees',employeeRoutes)

app.listen(3000,() => console.log("Server is running on port 3000"))