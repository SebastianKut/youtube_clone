// Make sure user is logged in middleware
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.currentUser;
  if (!user) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
  return next();
};
