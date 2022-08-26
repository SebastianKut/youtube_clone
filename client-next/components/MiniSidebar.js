import {
  HomeIcon,
  GlobeIcon,
  BookmarkIcon,
  FilmIcon,
  PlayIcon,
} from '@heroicons/react/outline';
import MiniSidebarItem from './MiniSidebarItem';

function MiniSidebar() {
  return (
    <div className="px-1 left-0 bg-white">
      <ul className="flex flex-col py-2 w-[80px] ">
        <MiniSidebarItem icon={HomeIcon} label="Home" linkHref="/" />
        <MiniSidebarItem icon={GlobeIcon} label="Explore" linkHref="/" />
        <MiniSidebarItem icon={BookmarkIcon} label="Shorts" linkHref="/" />
        <MiniSidebarItem icon={FilmIcon} label="Subscriptions" linkHref="/" />
        <MiniSidebarItem icon={PlayIcon} label="Library" linkHref="/" />
      </ul>
    </div>
  );
}

export default MiniSidebar;
