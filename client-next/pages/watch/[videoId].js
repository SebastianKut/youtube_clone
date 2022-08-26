import {
  ScissorsIcon,
  ShareIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { formatDate } from '../../utils/dateFormater';
import Image from 'next/image';

function VideoPage() {
  const { query } = useRouter();

  return (
    <div className="w-full flex flex-col justify-center pb-24 ">
      <div className="bg-black">
        <video
          className="mx-auto w-[1024px]"
          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
          controls
          id="video-player"
        />
      </div>

      <div className="flex flex-col xl:flex-row xl:justify-between py-4 border-b border-gray lg:w-[1024px] mx-auto px-6 md:px-0">
        <div className="xl:w-1/2 flex flex-col justify-between">
          <h1 className="text-lg mb-4">{query.title}</h1>
          <p className="text-sm text-gray-500">
            955,125 views • {formatDate(query.createdAt)}
          </p>
        </div>
        <ul className="flex w-1/2 h-full xl:justify-end xl:items-end mt-5 xl:mt-0">
          <li className="flex h-5 items-center xl:ml-9">
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

      <div className="flex flex-col xl:flex-row justify-between py-4  px-6 md:px-0 lg:w-[1024px] mx-auto border-b border-gray xl:h-[230px] min-h-fit">
        <div className=" flex lg:w-4/6 justify-start">
          <div className="mr-3 min-w-fit">
            <Image
              height={48}
              width={48}
              className="h-12 rounded-full"
              src="/avatar_placeholder.jpg"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col justify-between items-start">
            <div className="pb-3 xl:pb-0">
              <div className="flex items-center mb-1">
                <h1 className="text-sm font-semibold">{query.owner}</h1>
                <CheckCircleIcon className="h-4 ml-1 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">2.63M subscribers</p>
            </div>
            <p className="text-sm pb-3 xl:pb-0">{query.description}</p>
            <button className="text-sm text-gray-500 uppercase font-semibold pb-3 xl:pb-0">
              Show more
            </button>
          </div>
        </div>
        <div className="hidden lg:w-2/6 xl:flex xl:justify-end items-start justify-start">
          <button className="uppercase text-sm text-white font-semibold bg-red-600 px-4 py-2 ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
