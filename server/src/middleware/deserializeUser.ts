// Takes cookie(jwt inside it) from the browser and fetches user object to attach to Request

import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyJwt } from '../modules/auth/auth.utils';

// add currentUser property to Request object so we can attach it to it
declare global {
  namespace Express {
    interface Request {
      currentUser?: string | JwtPayload | null;
    }
  }
}

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // grab a token and remove bearer word from it
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ''
  ).replace(/^Bearer\s/, '');

  if (!accessToken) return next();

  const decoded = verifyJwt(accessToken);

  if (decoded) {
    req.currentUser = decoded;
  }

  return next();
};
