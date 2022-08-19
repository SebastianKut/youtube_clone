import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;

export const isRequestFromServer = () => {
  if (typeof window === 'undefined') return true;
  return false;
};

export const registerUser = async (payload) => {
  const res = await axios.post(userBase, payload);
  return res.data;
};

export const loginUser = async (payload) => {
  const res = await axios.post(`${authBase}/login`, payload, {
    withCredentials: true, //`withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials with cookies
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${authBase}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const getUser = async (fromServer = false, req = {}) => {
  const config = fromServer
    ? {
        withCredentials: true,
        headers: req.headers,
      }
    : {
        withCredentials: true,
      };

  try {
    const response = await axios.get(userBase, config);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const uploadVideo = async ({ formData, config }) => {
  const res = await axios.post(videosBase, formData, {
    withCredentials: true,
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateVideo = async ({ videoId, ...payload }) => {
  const res = await axios.patch(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });

  return res.data;
};

export const getVideos = async () => {
  const res = await axios.get(videosBase);
  return res.data;
};
