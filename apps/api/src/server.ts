import { criarApp } from './app.js';
import { env } from './config/env.js';
import { dataSource } from './db/dataSource.js';
import { redis } from './db/redis.js';

await dataSource.initialize();
const app = await criarApp();

const encerrar = async () => {
  await app.close();
  await dataSource.destroy();
  redis.disconnect();
  process.exit(0);
};

process.on('SIGINT', encerrar);
process.on('SIGTERM', encerrar);

await app.listen({ port: env.API_PORT, host: '0.0.0.0' });
