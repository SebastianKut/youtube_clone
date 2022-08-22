import Link from 'next/link';
import { timeAgo } from '../utils/timeAgo';

function VideoCard({ videoId, title, owner, createdAt }) {
  return (
    <Link href={`/watch/${videoId}`}>
      <a>
        <video
          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${videoId}`}
          width="301px"
          height="auto"
        />
        <h1>{title}</h1>
        <h1>Video Card</h1>
        <p>
          {owner.username} • {timeAgo.format(Date.parse(createdAt))}
        </p>
      </a>
    </Link>
  );
}

export default VideoCard;
