import { Redis } from 'ioredis';
import { env } from '../config/env.js';

// BullMQ exige maxRetriesPerRequest: null nas conexões usadas por workers.
export const redis = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });
