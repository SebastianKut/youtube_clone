import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { registerUserHandeler } from './user.controller';
import { registerUserSchema } from './user.schema';

const router = express.Router();

router.post(
  '/',
  processRequestBody(registerUserSchema.body), //this middelware from zod takes our zod schema and sanitsies body of the request to exactly what we want
  registerUserHandeler
);

export { router as userRoute };
