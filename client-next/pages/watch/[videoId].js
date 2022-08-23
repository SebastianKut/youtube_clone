import {
  ScissorsIcon,
  ShareIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { formatDate } from '../../utils/dateFormater';

function VideoPage() {
  const { query } = useRouter();

  return (
    <div className="w-full flex flex-col justify-center pb-24">
      <div className="bg-black">
        <video
          className="mx-auto"
          width="1024px"
          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
          controls
          id="video-player"
        />
      </div>

      <div className="flex justify-between h-24 py-4  border-b border-gray w-[1024px] mx-auto">
        <div className="w-1/2 flex flex-col justify-between">
          <h1 className="text-lg">{query.title}</h1>
          <p className="text-sm text-gray-500">
            955,125 views • {formatDate(query.createdAt)}
          </p>
        </div>
        <ul className="flex w-1/2 h-full justify-end items-end">
          <li className="flex h-5 items-center ml-9">
            <ThumbUpIcon className="h-full mr-2" />
            <p className="uppercase font-semibold">45K</p>
          </li>
          <li className="flex h-5 items-center ml-9">
            <ThumbDownIcon className="h-full mr-2" />
            <p className="uppercase font-semibold">Dislike</p>
          </li>
          <li className="flex h-5 items-center ml-9">
            <ShareIcon className="h-full mr-2" />
            <p className="uppercase font-semibold">Share</p>
          </li>
          <li className="flex h-5 items-center ml-9">
            <ScissorsIcon className="h-full mr-2" />
            <p className="uppercase font-semibold">Clip</p>
          </li>
        </ul>
      </div>

      <div className="flex justify-between py-4 w-[1024px] mx-auto border-b border-gray h-[230px]">
        <div className=" flex w-4/6 justify-start">
          <div className="mr-3 min-w-fit">
            <img
              className="h-12 rounded-full"
              src="/avatar_placeholder.jpg"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col justify-between items-start">
            <div>
              <div className="flex items-center mb-1">
                <h1 className="text-sm font-semibold">{query.owner}</h1>
                <CheckCircleIcon className="h-4 ml-1 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">2.63M subscribers</p>
            </div>
            <p className="text-sm">{query.description}</p>
            <button className="text-sm text-gray-500 uppercase font-semibold">
              Show more
            </button>
          </div>
        </div>
        <div className="w-2/6  flex justify-end items-start">
          <button className="uppercase text-sm text-white font-semibold bg-red-600 px-4 py-2 ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
