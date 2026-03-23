import Link from 'next/link';

const links = [
  { name: 'Jobs Library', href: '/dashboard/jobs' },
];

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-blue-900 px-3 py-4 md:px-2">
      {/* Logo */}
      <Link
        href="/dashboard/jobs"
        className="mb-6 flex h-20 items-center justify-start rounded-md bg-blue-800 p-4 md:h-40"
      >
        <span className="text-xl font-bold tracking-tight text-white">
          📋 Jobs Library
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-blue-800 p-3 text-sm font-medium text-white hover:bg-blue-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <span className="hidden md:block">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
