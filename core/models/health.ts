export type ServiceHealthLevel = 'operational' | 'degraded' | 'offline';

export interface ServiceHealth {
  readonly service: string;
  readonly message: string;
  readonly level: ServiceHealthLevel;
  readonly checkedAt: string;
}

export const createServiceHealth = (
  service: string,
  message: string,
  level: ServiceHealthLevel = 'operational',
  checkedAt: Date = new Date(),
): ServiceHealth => ({
  service,
  message,
  level,
  checkedAt: checkedAt.toISOString(),
});
