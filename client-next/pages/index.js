import { getVideos } from '../api';
import TagBar from '../components/TagBar';
import VideoCard from '../components/VideoCard';

const IndexPage = ({ videos }) => {
  console.log(videos);
  return (
    <div>
      <TagBar />
      <div className="grid grid-cols-4 gap-4 bg-gray-100 py-3 px-9">
        {videos.map((video) => {
          return (
            <VideoCard
              key={video.videoId}
              videoId={video.videoId}
              title={video.title}
              description={video.description}
              owner={video.owner}
              createdAt={video.createdAt}
            />
          );
        })}
      </div>
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
