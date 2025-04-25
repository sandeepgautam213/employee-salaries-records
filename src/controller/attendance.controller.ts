

import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '../generated/prisma'

const prisma = new PrismaClient()

export async function markAttendance(req: Request, res: Response): Promise<void> {
  try {
    const { hoursWorked } = req.body
    const employeeId = req.user?.id
    if (!hoursWorked || !employeeId) {
      res.status(400).json({ message: 'Missing required fields' })
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existing = await prisma.attendance.findFirst({
      where: {
        employeeId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

    if (existing) {
      res.status(400).json({ message: 'Attendance already marked today' })
      return
    }

    const data: Prisma.AttendanceCreateInput = {
      employee: { connect: { id: employeeId } },
      hoursWorked,
      date: new Date(),
    }
    
    const attendance = await prisma.attendance.create({ data })
    
    
    res.status(201).json(attendance)
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark attendance', error: err })
  }
}
