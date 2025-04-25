import { RequestHandler } from 'express'
import { PrismaClient } from '../generated/prisma'
const prisma = new PrismaClient()

function getTaxFromSlab(gross: number): number {
  if (gross > 100000) return gross * 0.2
  if (gross > 50000) return gross * 0.1
  return 0
}

export const calculateSalary: RequestHandler = async (req, res) => {
  try {
    const { employeeId, month, basicSalary, hra, allowances, otherDeductions = 0 } = req.body

    const grossSalary = basicSalary + hra + allowances
    const tax = getTaxFromSlab(grossSalary)
    const pf = basicSalary * 0.12

    const start = new Date(`${month}-01`)
    const end = new Date(new Date(start).setMonth(start.getMonth() + 1))

    const attendance = await prisma.attendance.findMany({
      where: {
        employeeId,
        date: { gte: start, lt: end },
      },
    })

    const workingDays = 22
    const dailyWage = grossSalary / workingDays

    let fullDays = 0, halfDays = 0
    for (const att of attendance) {
      if (att.hoursWorked >= 8) fullDays++
      else halfDays++
    }

    const totalSalary = (fullDays * dailyWage) + (halfDays * dailyWage / 2)
    const netSalary = totalSalary - tax - pf - otherDeductions

    const saved = await prisma.salary.create({
      data: {
        employeeId,
        month,
        grossSalary,
        tax,
        pf,
        otherDeductions,
        netSalary,
      },
    })

    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate salary', error: err })
  }
}
