import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1009',
  database: 'plated_food_app',
  synchronize: true,
  logging: ['query', 'error'],
  entities: ['src/database/entities/*.ts'],
  // migrations: ['src/database/migrations/*.ts'],
  // migrationsRun: false,
});
