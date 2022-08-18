import { SimpleGrid } from '@mantine/core';
import { NextPageContext } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import { getVideos } from '../api';
import VideoTeaser from '../components/VideoTeaser';
import HomePageLayout from '../layout/Home';
import styles from '../styles/Home.module.css';
import { Video } from '../types';

const Home = ({ videos }: { videos: Video[] }) => {
  return (
    <div className={styles.container}>
      <SimpleGrid cols={3}>
        {videos?.map((video) => {
          return <VideoTeaser key={video.videoId} video={video} />;
        })}
      </SimpleGrid>
    </div>
  );
};

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const videos = await getVideos();
  return {
    props: { videos },
  };
}
