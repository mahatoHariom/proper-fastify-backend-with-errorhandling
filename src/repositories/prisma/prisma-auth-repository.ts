import { Prisma } from '@prisma/client'

import { authRepository } from '../auth-repository'
import { prisma } from 'libs'

export class PrismaAuthRepository implements authRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } })

    return user
  }
}
