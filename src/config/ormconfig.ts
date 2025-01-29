import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { configs } from './env.js';
import entities from '../database/entities/index.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // url: configs.database.POSTGRES_URL,
  host: configs.database.POSTGRES_HOST, // condition for npm run dev localhost and for docker postgres
  port: configs.database.POSTGRES_PORT,
  username: configs.database.POSTGRES_USER,
  password: configs.database.POSTGRES_PASSWORD,
  database: configs.database.POSTGRES_DB,
  // ssl: { rejectUnauthorized: false },
  synchronize: true,
  logging: ['query', 'error'],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,  //disable SSL for local development
  entities,
  // migrations: ['src/database/migrations/*.ts'],
  // migrationsRun: false,
});

// first make new server on 5435 with localhost on pgadmin and it will be connected to docker data base
// then I need to transfer the data from localhost 5432 to localhost 5435
