import jwt from 'jsonwebtoken';
import { config } from '../../config';

const JWT_KEY = config.jwt_key || 'changeme';
const EXPIRES_IN = config.expiress_in || '1d';

export const signJwt = (payload: string | Buffer | object) => {
  return jwt.sign(payload, JWT_KEY, { expiresIn: EXPIRES_IN });
};

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (error) {
    return null;
  }
};
