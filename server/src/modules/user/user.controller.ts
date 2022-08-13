import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RegisterUserBody } from './user.schema';
import { createUser } from './user.service';

export const registerUserHandeler = async (
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) => {
  const { username, email, password } = req.body;

  console.log(req.body);
  try {
    // Dnt want to call DB inside the controller, want to call services
    await createUser({ username, email, password });
    return res.status(StatusCodes.CREATED).send('User created successfully');
  } catch (error: any) {
    // becasue we specified unique name and email in the model DB will return an error 11000 if its not
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send('User already exists');
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const showUserHandeler = async (req: Request, res: Response) => {
  return res.send(req.currentUser);
};
