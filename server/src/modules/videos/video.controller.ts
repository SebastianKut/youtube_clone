import busboy from 'busboy';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createVideo, findVideo, findVideos } from './video.service';
import { Video } from './video.model';
import fs from 'fs';
import { UpdateVideoBody, UpdateVideoParams } from './video.schema';
import { message } from '../../utils/message';

const MIME_TYPES = ['video/mp4'];

const CHUNK_SIZE_IN_BYTES = 1000000; // 1MB

const getPath = (videoId: Video['videoId'], extension: Video['extension']) => {
  return `${process.cwd()}/videos/${videoId}.${extension}`;
};

export const uploadVideoHandeler = async (req: Request, res: Response) => {
  // files have to be spllit in small chunks in the memory and upload small chunk at a time instead of one big file at once
  // busboy will take care of this

  const bb = busboy({ headers: req.headers });

  const user = req.currentUser;

  const video = await createVideo({ owner: user!.id });

  // Listen for file upload
  bb.on('file', async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(message('Invalid file type'));
    }

    const extension = info.mimeType.split('/')[1];

    const filePath = getPath(video.videoId, extension);

    video.extension = extension;

    await video.save();

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on('close', () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: 'close',
      'Content-Type': 'application/json',
    });

    res.write(JSON.stringify(video));
    res.end();
  });

  return req.pipe(bb);
};

export const updateVideoHandeler = async (
  req: Request<UpdateVideoParams, {}, UpdateVideoBody>,
  res: Response
) => {
  const { videoId } = req.params;
  const { title, description, published } = req.body;
  const { currentUser } = req;
  const loggedUserId = String(currentUser!.id);

  const video = await findVideo(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send(message('Video not found'));
  }

  const videoOwnerId = String(video.owner);

  if (loggedUserId !== videoOwnerId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(message('You are unathorised to edit this video'));
  }

  video.title = title;
  video.description = description;
  video.published = published;

  await video.save();

  return res.status(StatusCodes.OK).send(video);
};

// _ as parameter means that there is a parameter but we dnt need it
export const findVideosHandeler = async (_: Request, res: Response) => {
  const videos = await findVideos();

  return res.status(StatusCodes.OK).send(videos);
};

export const streamVideoHandeler = async (req: Request, res: Response) => {
  const { videoId } = req.params;

  // want to stream video in small chunks, range header will specify which chunk to stream
  const range = req.headers.range;

  if (!range) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(message('Range must be provided'));
  }

  const video = await findVideo(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send(message('Video not found'));
  }

  const filePath = getPath(video.videoId, video.extension);

  const fileSizeInBytes = fs.statSync(filePath).size;

  const chunkStart = Number(range.replace(/\D/g, ''));

  //This is to make sure we stay in the files range
  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    fileSizeInBytes - 1
  );

  const contentLenght = chunkEnd - chunkStart + 1;

  const headers = {
    'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSizeInBytes}`,
    'Accept-Ranges': 'bytes',
    'Content-length': contentLenght,
    'Content-Type': `video/${video.extension}`, // MIME TYPE
    'Cross-Origin-Resource-Policy': 'cross-origin', //This is to give OK to the client that runs on different port thank server
  };

  // Header that says that this is a partial response
  res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);

  // creating Read Stream so we send it chunk by chunk and not the whole video
  const videoStream = fs.createReadStream(filePath, {
    start: chunkStart,
    end: chunkEnd,
  });

  videoStream.pipe(res);
};
