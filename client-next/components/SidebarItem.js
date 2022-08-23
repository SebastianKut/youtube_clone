import Link from 'next/link';

function SidebarItem({ icon: Icon, label, linkHref }) {
  return (
    <li className="hover:bg-gray-200">
      <Link href={linkHref}>
        <a className="flex h-9 py-4 pl-7 justify-start items-center">
          <Icon className="h-6 mr-6" />
          <p className="text-sm pr-1">{label}</p>
        </a>
      </Link>
    </li>
  );
}

export default SidebarItem;
