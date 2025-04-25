import {Request ,RequestHandler,Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from '../generated/prisma'


const prisma = new PrismaClient()
export const login:any  = async (req:Request,res:Response) => {
  const {email,password} = req.body
  const user = await prisma.user.findUnique({where:{email}})

  if(!user || !(await bcrypt.compare(password,user.password))) {
    return res.status(401).json({message:'Invalid credentials'})
  }

  const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET!, {expiresIn:'1d'})
  res.cookie('token',token,{httpOnly:true,secure:false})
  res.json({message:'Logged in Successfully'})
}

export const logout :any = (_req:Request,res:Response) => {
  res.clearCookie('token')
  res.json({message:'Logged out successfully'})
}