import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { requireUser } from '../../middleware/requireUser';
import { loginHandeler, logoutHandeler } from './auth.controller';
import { loginUserSchema } from './auth.schema';

const router = express.Router();

router.post('/login', processRequestBody(loginUserSchema.body), loginHandeler);

router.post('/logout', requireUser, logoutHandeler);

export { router as authRoute };
