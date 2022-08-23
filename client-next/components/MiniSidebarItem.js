import Link from 'next/link';

function MiniSidebarItem({ icon: Icon, label, linkHref }) {
  return (
    <li>
      <Link href={linkHref}>
        <a className="flex flex-col h-14 justify-center items-center">
          <Icon className="mb-1 h-6" />
          <p className="text-xs">{label}</p>
        </a>
      </Link>
    </li>
  );
}

export default MiniSidebarItem;
