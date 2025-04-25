import { RequestHandler } from 'express'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

export const distributePayroll: RequestHandler = async (req, res) => {
  try {
    const { month } = req.body

    if (!month) {
      res.status(400).json({ error: 'Month is required' })
      return
    }

    const salaries = await prisma.salary.findMany({ where: { month } })

    if (!salaries.length) {
      res.status(404).json({ message: 'No salaries found for this month' })
      return
    }

    const totalAmount = salaries.reduce((sum, s) => sum + s.netSalary, 0)

    const payroll = await prisma.payroll.create({
      data: { month, totalAmount },
    })

    res.status(201).json({ message: 'Payroll distributed successfully', payroll })
  } catch (err) {
    console.error('Distribute error:', err)
    res.status(500).json({ error: 'Failed to distribute payroll' })
  }
}


export const getPayrollHistory: RequestHandler = async (req, res) => {
  try {
    const { month } = req.query

    const history = await prisma.payroll.findMany({
      where: month ? { month: String(month) } : {},
    })

    res.status(200).json(history)
  } catch (err) {
    console.error('History fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch payroll history' })
  }
}
