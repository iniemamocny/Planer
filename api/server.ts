import express, { type NextFunction, type Request, type Response } from 'express';
import { getHealthSummary } from '../core/modules/health.js';

const app = express();
const port = Number.parseInt(process.env.PORT ?? '', 10) || 3000;

app.get('/', (_req: Request, res: Response) => {
  const { health, uptimeSeconds } = getHealthSummary();
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Planer Server</title>
  </head>
  <body>
    <main>
      <h1>Planer backend is running</h1>
      <p>If you can see this page, the Express server started successfully.</p>
      <p>Current status: ${health.level.toUpperCase()} (${health.message}).</p>
      <p>Uptime: ${uptimeSeconds} seconds.</p>
    </main>
  </body>
</html>`);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json(getHealthSummary());
});

app.use((_req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  },
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
