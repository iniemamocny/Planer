import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('health module', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('creates an operational API health entry with a valid timestamp', async () => {
    const { getApiHealth } = await import('../health.ts');

    const health = getApiHealth();

    expect(health).toMatchObject({
      service: 'api',
      message: 'Planer API is running smoothly',
      level: 'operational',
    });
    expect(typeof health.checkedAt).toBe('string');
    expect(new Date(health.checkedAt).toString()).not.toBe('Invalid Date');

    const custom = getApiHealth('All systems go');
    expect(custom.message).toBe('All systems go');
  });

  it('reports uptime based on the elapsed seconds since startup', async () => {
    jest.useFakeTimers();

    const start = new Date('2024-01-01T00:00:00.000Z');
    jest.setSystemTime(start);

    const { getUptimeSeconds } = await import('../health.ts');

    expect(getUptimeSeconds()).toBe(0);

    jest.advanceTimersByTime(2_000);
    expect(getUptimeSeconds()).toBe(2);

    jest.advanceTimersByTime(3_500);
    expect(getUptimeSeconds()).toBe(5);
  });

  it('returns a summary containing the latest health details and uptime', async () => {
    jest.useFakeTimers();

    const start = new Date('2024-02-02T10:00:00.000Z');
    jest.setSystemTime(start);

    const { getHealthSummary } = await import('../health.ts');

    jest.advanceTimersByTime(42_000);

    const summary = getHealthSummary();

    expect(summary.health).toMatchObject({
      service: 'api',
      message: 'Planer API is running smoothly',
      level: 'operational',
    });
    expect(new Date(summary.health.checkedAt).toString()).not.toBe('Invalid Date');
    expect(summary.uptimeSeconds).toBe(42);
  });
});
