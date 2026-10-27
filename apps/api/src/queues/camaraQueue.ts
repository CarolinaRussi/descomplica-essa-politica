import { Queue } from 'bullmq';
import { redis } from '../db/redis.js';

export const CAMARA_QUEUE = 'camara';

export const camaraQueue = new Queue(CAMARA_QUEUE, { connection: redis });
