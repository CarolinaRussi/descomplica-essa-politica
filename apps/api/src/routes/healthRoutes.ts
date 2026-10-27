import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { healthController } from '../controllers/healthController.js';

const statusServico = z.enum(['ok', 'erro']);
const respostaSaude = z.object({
  status: statusServico,
  postgres: statusServico,
  redis: statusServico,
});

export const healthRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/health',
    { schema: { response: { 200: respostaSaude, 503: respostaSaude } } },
    healthController.verificarSaude,
  );
};
