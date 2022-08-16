import axios from 'axios';
import { User } from '../types';

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;

export const registerUser = async (payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) => {
  const res = await axios.post(userBase, payload);
  return res.data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(authBase, payload, {
    withCredentials: true, //`withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
  });
  return res.data;
};

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await axios.get(userBase, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const uploadVideo = async ({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) => {
  const res = await axios.post(videosBase, formData, {
    withCredentials: true,
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateVideo = async ({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) => {
  const res = await axios.patch(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });

  return res.data;
};

export const getVideos = async () => {
  const res = await axios.get(videosBase);
  return res.data;
};
