import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('health module', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns default API health details', async () => {
    const { getApiHealth } = await import('../health.ts');

    const health = getApiHealth();

    expect(health).toMatchObject({
      service: 'api',
      message: 'Planer API is running smoothly',
      level: 'operational',
    });
    expect(typeof health.checkedAt).toBe('string');
    expect(new Date(health.checkedAt).toString()).not.toBe('Invalid Date');
  });

  it('reports uptime that increases over time', async () => {
    jest.useFakeTimers();

    const initial = new Date('2024-01-01T00:00:00.000Z');
    jest.setSystemTime(initial);

    const { getUptimeSeconds } = await import('../health.ts');

    expect(getUptimeSeconds()).toBe(0);

    jest.advanceTimersByTime(2000);
    const uptimeAfterTwoSeconds = getUptimeSeconds();
    expect(uptimeAfterTwoSeconds).toBe(2);

    jest.advanceTimersByTime(1500);
    expect(getUptimeSeconds()).toBeGreaterThan(uptimeAfterTwoSeconds);
  });

  it('returns a summary with health details and uptime', async () => {
    const { getHealthSummary } = await import('../health.ts');

    const summary = getHealthSummary();

    expect(summary).toEqual({
      health: expect.objectContaining({
        service: 'api',
        message: 'Planer API is running smoothly',
        level: 'operational',
        checkedAt: expect.any(String),
      }),
      uptimeSeconds: expect.any(Number),
    });
    expect(summary.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });
});
