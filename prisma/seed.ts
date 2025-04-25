import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('admin123',10)
  await prisma.user.create({
    data : {
      email : 'hr@codetommorow.com',
      password,
      role: 'HR'
    }
  })
}
main()