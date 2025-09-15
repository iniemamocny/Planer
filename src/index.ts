import { getHealthSummary } from '../core/modules/health.js';

const summary = getHealthSummary();
console.log(
  `[Planer] ${summary.health.service.toUpperCase()} status: ${summary.health.level} - ${summary.health.message}. ` +
    `Uptime ${summary.uptimeSeconds}s.`,
);
