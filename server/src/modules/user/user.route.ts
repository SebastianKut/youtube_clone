import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { requireUser } from '../../middleware/requireUser';
import { registerUserHandeler, showUserHandeler } from './user.controller';
import { registerUserSchema } from './user.schema';

const router = express.Router();

// returns current user
router.get('/', requireUser, showUserHandeler);

// registers new user
router.post(
  '/',
  processRequestBody(registerUserSchema.body), //this middelware from zod takes our zod schema and sanitsies body of the request to exactly what we want
  registerUserHandeler
);

export { router as userRoute };
