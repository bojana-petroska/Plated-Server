import dotenv from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.prod'
    : '.env';

dotenv.config({ path: envFile });

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5001,
  database: {
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'postgres',
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || '5432'),
    POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
    POSTGRES_DB: process.env.POSTGRES_DB || '',
    POSTGRES_URL: process.env.POSTGRES_URL || '',
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
