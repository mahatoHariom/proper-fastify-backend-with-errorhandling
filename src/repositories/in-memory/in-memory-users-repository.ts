import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'crypto';

import { UsersRepository } from '..';

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
      id: randomUUID(),
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find(user => user.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string) {
    const user = this.items.find(user => user.id === id);

    if (!user) return null;

    return user;
  }
}
