import type { FastifyReply, FastifyRequest } from 'fastify';
import { dataSource } from '../db/dataSource.js';
import { redis } from '../db/redis.js';

type StatusServico = 'ok' | 'erro';

const verificar = async (checagem: () => Promise<unknown>): Promise<StatusServico> => {
  try {
    await checagem();
    return 'ok';
  } catch {
    return 'erro';
  }
};

export const healthController = {
  async verificarSaude(_request: FastifyRequest, reply: FastifyReply) {
    const [postgres, redisStatus] = await Promise.all([
      verificar(() => dataSource.query('SELECT 1')),
      verificar(() => redis.ping()),
    ]);

    const saudavel = postgres === 'ok' && redisStatus === 'ok';

    return reply.status(saudavel ? 200 : 503).send({
      status: saudavel ? 'ok' : 'erro',
      postgres,
      redis: redisStatus,
    });
  },
};
