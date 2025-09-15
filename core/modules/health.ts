import { createServiceHealth, type ServiceHealth } from '../models/health.js';

const startedAt = new Date();

export const getApiHealth = (message = 'Planer API is running smoothly'): ServiceHealth =>
  createServiceHealth('api', message);

export const getUptimeSeconds = (): number =>
  Math.floor((Date.now() - startedAt.getTime()) / 1000);

export const getHealthSummary = (): { health: ServiceHealth; uptimeSeconds: number } => ({
  health: getApiHealth(),
  uptimeSeconds: getUptimeSeconds(),
});
