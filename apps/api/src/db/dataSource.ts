import 'reflect-metadata';
import path from 'node:path';
import { DataSource } from 'typeorm';
import { env } from '../config/env.js';

const caminhoGlob = (...partes: string[]) =>
  path.join(import.meta.dirname, ...partes).replaceAll('\\', '/');

export const dataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  synchronize: false,
  logging: env.NODE_ENV === 'development' ? ['error', 'warn', 'migration'] : ['error'],
  entities: [caminhoGlob('../entities/*.{ts,js}')],
  migrations: [caminhoGlob('./migrations/*.{ts,js}')],
});
