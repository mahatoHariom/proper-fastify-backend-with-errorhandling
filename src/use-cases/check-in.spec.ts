import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  InMemoryCheckInsRepository,
  InMemoryGymsRepository,
} from '@/repositories';

import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      description: '',
      latitude: new Decimal(-27.105437),
      longitude: new Decimal(-48.9210107),
      phone: '',
      title: 'Life Up Academia',
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.105437,
      userLongitude: -48.9210107,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 14, 8, 0, 0));

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.105437,
      userLongitude: -48.9210107,
    });

    await expect(() =>
      sut.handle({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -27.105437,
        userLongitude: -48.9210107,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 14, 8, 0, 0));

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.105437,
      userLongitude: -48.9210107,
    });

    vi.setSystemTime(new Date(2024, 0, 15, 8, 0, 0));

    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.105437,
      userLongitude: -48.9210107,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      description: '',
      latitude: new Decimal(-27.1169612),
      longitude: new Decimal(-48.9303596),
      phone: '',
      title: 'Prime Fit',
    });

    await expect(() =>
      sut.handle({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -27.105437,
        userLongitude: -48.9210107,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
