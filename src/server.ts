import express from 'express';

const app = express();
const port = Number.parseInt(process.env.PORT ?? '', 10) || 3000;

app.get('/', (_req, res) => {
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
    </main>
  </body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
