import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  db_connection: process.env.DB_CONNECTION,
  cors_origin: process.env.CORS_ORIGIN,
  domain: process.env.DOMAIN,
  production: process.env.PRODUCTION,
  jwt_key: process.env.JWT_KEY,
  expiress_in: process.env.EXPIRES_IN,
};
