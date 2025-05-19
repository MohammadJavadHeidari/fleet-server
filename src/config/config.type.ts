const MONGO_DATABASE = {
  MONGO_URL: 'MONGO_URL',
  MONGO_DBNAME: 'MONGO_DBNAME',
} as const;

// CACHE
const CACHE = {
  CACHE_STORE: 'CACHE_STORE',
  CACHE_TTL: 'CACHE_TTL',
  CACHE_MAX: 'CACHE_MAX',
} as const;

// JWT
const JWT = {
  JWT_TOKEN_SECRET: 'JWT_TOKEN_SECRET',
} as const;

export const ENV_KEY = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  APP_NAME: 'APP_NAME',
  API_PREFIX: 'API_PREFIX',
  ...MONGO_DATABASE,
  ...CACHE,
  ...JWT,
} as const;
