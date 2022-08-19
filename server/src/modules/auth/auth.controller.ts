import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findUserByEmail } from '../user/user.service';
import { LoginUserBody } from './auth.schema';
import { signJwt } from './auth.utils';

const DOMAIN = process.env.DOMAIN || 'localhost';
const SECURE = process.env.PRODUCTION ? true : false;

export const loginHandeler = async (
  req: Request<{}, {}, LoginUserBody>,
  res: Response
) => {
  const { email, password } = req.body;

  console.log(req.body);

  // find user by email
  const user = await findUserByEmail(email);
  if (!user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid email or password');

  // verify password
  const passwordVerified = await user.passwordMatch(password);
  if (!passwordVerified)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid email or password');

  const userPayload = {
    username: user.username,
    email: user.email,
    id: String(user._id),
  };

  // sign jwt
  const jwt = signJwt(userPayload);

  // add a cookie to the response
  res.cookie('accessToken', jwt, {
    maxAge: 3.154e10, //1 year
    httpOnly: true, // this means it wont be accessible via javascript, only via http request
    domain: DOMAIN,
    path: '/',
    sameSite: 'strict',
    secure: SECURE, // change to true in production
  });

  // send response

  return res.status(StatusCodes.OK).send(userPayload);
};

export const logoutHandeler = async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  return res.status(StatusCodes.OK).send({ currentUser: null });
};
