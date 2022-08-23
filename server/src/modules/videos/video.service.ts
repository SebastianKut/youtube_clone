import { Video, VideoModel } from './video.model';

export const createVideo = ({ owner }: { owner: string }) => {
  return VideoModel.create({ owner });
};

export const findVideo = (videoId: Video['videoId']) => {
  return VideoModel.findOne({ videoId });
};

export const findVideos = () => {
  return VideoModel.find({ published: true })
    .populate('owner', 'username email') // only certain fields
    .lean(); //lean returns plain Old Javascript Object
};
