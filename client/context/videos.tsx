import { Loader } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';
import { getVideos } from '../api';
import { QueryKeys, User } from '../types';

const VideoContext = createContext({});

const VideoContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery(QueryKeys.videos, getVideos);

  return (
    <VideoContext.Provider value={{ videos: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </VideoContext.Provider>
  );
};

const useVideoContext = () => useContext(VideoContext);

export { VideoContextProvider, useVideoContext };
