

import { RequestHandler } from 'express'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

export const createEmployee: RequestHandler = async (req, res) => {
  try {
    const { name, email, role, department } = req.body
    const employee = await prisma.employee.create({
      data: { name, email, role, department },
    })
    res.status(201).json(employee)
  } catch (err) {
    res.status(500).json({ message: 'Employee creation failed', error: err })
  }
}

export const getEmployee: RequestHandler = async (req, res) => {
  const id = Number(req.params.id)
  const employee = await prisma.employee.findUnique({ where: { id } })
  if (!employee){
  res.status(404).json({ message: 'Employee not found' })
  return
  }
  res.json(employee)
}
