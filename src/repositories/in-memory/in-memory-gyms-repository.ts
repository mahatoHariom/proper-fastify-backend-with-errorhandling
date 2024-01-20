import { Gym } from '@prisma/client';

import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id);

    if (!gym) return null;

    return gym;
  }
}
