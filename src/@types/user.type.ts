// user.types.ts

import { Product } from './product.type'

export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
  product: Product[]
}
