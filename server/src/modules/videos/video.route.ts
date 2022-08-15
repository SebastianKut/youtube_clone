import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { requireUser } from '../../middleware/requireUser';
import {
  findVideosHandeler,
  streamVideoHandeler,
  updateVideoHandeler,
  uploadVideoHandeler,
} from './video.controller';
import { updateVideoSchema } from './video.schema';

const router = express.Router();

router.post('/', requireUser, uploadVideoHandeler);
router.patch(
  '/:videoId',
  requireUser,
  processRequestBody(updateVideoSchema.body),
  updateVideoHandeler
);
router.get('/', findVideosHandeler);
router.get('/:videoId', streamVideoHandeler);

export { router as videoRoute };
