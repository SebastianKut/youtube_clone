import Link from 'next/link';

function SidebarItem({ icon: Icon, label, linkHref }) {
  return (
    <li>
      <Link href={linkHref}>
        <a className="flex h-9 py-4 pl-7 justify-start items-center">
          <Icon className="h-6 mr-6" />
          <p className="text-sm">{label}</p>
        </a>
      </Link>
    </li>
  );
}

export default SidebarItem;
