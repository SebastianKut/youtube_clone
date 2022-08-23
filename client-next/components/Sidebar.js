import {
  HomeIcon,
  GlobeIcon,
  BookmarkIcon,
  FilmIcon,
  PlayIcon,
  LocationMarkerIcon,
  ClockIcon,
  VideoCameraIcon,
  ThumbUpIcon,
  PresentationChartLineIcon,
  PuzzleIcon,
  ShoppingBagIcon,
  BookOpenIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <div className="min-w-fit pr-4 pl-1">
      <ul className="flex flex-col py-2 border-b border-gray">
        <SidebarItem icon={HomeIcon} label="Home" linkHref="/" />
        <SidebarItem icon={GlobeIcon} label="Explore" linkHref="/" />
        <SidebarItem icon={BookmarkIcon} label="Shorts" linkHref="/" />
        <SidebarItem icon={FilmIcon} label="Subscriptions" linkHref="/" />
      </ul>
      <ul className="flex flex-col py-2 border-b border-gray">
        <SidebarItem icon={PlayIcon} label="Library" linkHref="/" />
        <SidebarItem icon={ClockIcon} label="History" linkHref="/" />
        <SidebarItem icon={VideoCameraIcon} label="Your videos" linkHref="/" />
        <SidebarItem icon={ThumbUpIcon} label="Liked videos" linkHref="/" />
      </ul>
      <ul className="flex flex-col py-2 border-b border-gray">
        <li className="flex h-9 py-4 pl-7 justify-start items-center">
          <p className="text-sm uppercase font-semibold text-gray-500">
            Explore
          </p>
        </li>
        <SidebarItem
          icon={PresentationChartLineIcon}
          label="Movies & Shows"
          linkHref="/"
        />
        <SidebarItem icon={PuzzleIcon} label="Gaming" linkHref="/" />
        <SidebarItem
          icon={ShoppingBagIcon}
          label="Fashion & Beauty"
          linkHref="/"
        />
        <SidebarItem icon={BookOpenIcon} label="Learning" linkHref="/" />
        <SidebarItem icon={UserGroupIcon} label="Sports" linkHref="/" />
      </ul>
    </div>
  );
}

export default Sidebar;
