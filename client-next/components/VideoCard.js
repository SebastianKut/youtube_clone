import Link from 'next/link';
import { timeAgo } from '../utils/timeAgo';

function VideoCard({ videoId, title, description, owner, createdAt }) {
  return (
    <div>
      <Link
        href={{
          pathname: `/watch/${videoId}`,
          query: {
            title,
            description,
            owner: owner.username,
            createdAt,
          },
        }}
      >
        <a>
          <video
            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${videoId}`}
            height="auto"
          />
        </a>
      </Link>
      <div className="flex py-3">
        <div className="h-8">
          <img
            className="h-full rounded-full "
            src="/avatar_placeholder.jpg"
            alt=""
          />
        </div>
        <div className="px-3">
          <h1 className="text-md font-semibold leading-3 mb-3">{title}</h1>
          <p className="text-sm text-gray-500">
            {owner.username} • {timeAgo.format(Date.parse(createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
