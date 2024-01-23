import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

import { getDistanceBetweenCoordinates } from '@/utils';

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      description: data.description ?? null,
      id: data.id ?? randomUUID(),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
      title: data.title,
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id);

    if (!gym) return null;

    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter(item => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter(item => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }
}
