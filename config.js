import dotenv from 'dotenv';

dotenv.config();
export const dbHostName = process.env.DB_HOST;
export const dbUser = process.env.DB_USER;
export const dbName = process.env.DB;
export const dbPort = process.env.DB_PORT;
export const userPassword = process.env.USER_PASSWORD;
export const secretToken = process.env.SECRET_TOKEN;
