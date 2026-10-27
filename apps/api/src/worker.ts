import { dataSource } from './db/dataSource.js';
import { redis } from './db/redis.js';
import { criarCamaraWorker } from './workers/camaraWorker.js';

await dataSource.initialize();

const workers = [criarCamaraWorker()];
console.info(`Workers ativos: ${workers.map((worker) => worker.name).join(', ')}`);

const encerrar = async () => {
  await Promise.all(workers.map((worker) => worker.close()));
  await dataSource.destroy();
  redis.disconnect();
  process.exit(0);
};

process.on('SIGINT', encerrar);
process.on('SIGTERM', encerrar);
