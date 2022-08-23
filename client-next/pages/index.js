import Link from 'next/link';
import { getVideos } from '../api';
import VideoCard from '../components/VideoCard';

const IndexPage = ({ videos }) => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-gray-100">
      {videos.map((video) => {
        return (
          <VideoCard
            key={video.videoId}
            videoId={video.videoId}
            title={video.title}
            owner={video.owner}
            createdAt={video.createdAt}
          />
        );
      })}
    </div>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const videos = await getVideos();
  return {
    props: { videos },
  };
}
