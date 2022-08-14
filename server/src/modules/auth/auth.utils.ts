import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY || 'changeme';
const EXPIRES_IN = process.env.EXPIRES_IN || '1d';

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
