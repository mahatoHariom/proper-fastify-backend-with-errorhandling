import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories';

import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 14, 8, 0, 0));

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await expect(() =>
      sut.handle({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 14, 8, 0, 0));

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    vi.setSystemTime(new Date(2024, 0, 15, 8, 0, 0));

    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
