import express from 'express';
import { requireUser } from '../../middleware/requireUser';
import {
  findVideosHandeler,
  streamVideoHandeler,
  updateVideoHandeler,
  uploadVideoHandeler,
} from './video.controller';

const router = express.Router();

router.post('/', requireUser, uploadVideoHandeler);
router.patch('/:videoId', requireUser, updateVideoHandeler);
router.get('/', findVideosHandeler);
router.get('/:videoId', streamVideoHandeler);

export { router as videoRoute };
