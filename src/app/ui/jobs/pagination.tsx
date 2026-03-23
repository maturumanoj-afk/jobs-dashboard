'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      <Link
        href={createPageURL(Math.max(1, currentPage - 1))}
        className={`rounded-md border px-3 py-1.5 text-sm ${currentPage <= 1 ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100'}`}
      >
        ‹
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            page === currentPage
              ? 'bg-blue-700 text-white'
              : 'border hover:bg-gray-100 text-gray-700'
          }`}
        >
          {page}
        </Link>
      ))}
      <Link
        href={createPageURL(Math.min(totalPages, currentPage + 1))}
        className={`rounded-md border px-3 py-1.5 text-sm ${currentPage >= totalPages ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100'}`}
      >
        ›
      </Link>
    </div>
  );
}
