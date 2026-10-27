import { Worker } from 'bullmq';
import { redis } from '../db/redis.js';
import { CAMARA_QUEUE } from '../queues/camaraQueue.js';

// ponytail: processador vazio. A ingestão real (dadosabertos.camara.leg.br/api/v2) entra
// junto com as entidades de domínio, chamando um service — nunca regra de negócio aqui.
export const criarCamaraWorker = () =>
  new Worker(
    CAMARA_QUEUE,
    async (job) => {
      console.info(`[camara] job ${job.name} (${job.id}) recebido`);
    },
    { connection: redis },
  );
