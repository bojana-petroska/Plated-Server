import { DataSource } from 'typeorm';
import entities from './entities/index.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres', // condition for npm run dev localhost and for docker postgres
  port: 5432,
  username: 'postgres',
  password: '1009',
  database: 'plated_food_app',
  synchronize: true,
  logging: ['query', 'error'],
  entities,
  // migrations: ['src/database/migrations/*.ts'],
  // migrationsRun: false,
});

// new server on 5435 with localhost on pgadmin and it will be connected to docker data base
// then I need to transfer the data from localhost 5432 to localhost 5435
