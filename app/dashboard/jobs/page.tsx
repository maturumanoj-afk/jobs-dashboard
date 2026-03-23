import { Suspense } from 'react';
import JobsTable from '@/app/ui/jobs/table';
import Search from '@/app/ui/search';
import StatusFilter from '@/app/ui/status-filter';
import Pagination from '@/app/ui/jobs/pagination';
import { CreateJob } from '@/app/ui/jobs/buttons';
import { JobsTableSkeleton } from '@/app/ui/jobs/skeletons';
import { fetchJobs } from '@/app/lib/data';

export const dynamic = 'force-dynamic';

export default async function JobsPage(props: {
  searchParams?: Promise<{ query?: string; status?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const status = searchParams?.status || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch total pages for pagination (lightweight count-only call)
  const { totalPages } = await fetchJobs({ query, status: status || undefined, page: currentPage });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Jobs Library</h1>
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-8">
        <Search placeholder="Search by title, department, location…" />
        <StatusFilter />
        <CreateJob />
      </div>

      {/* Table (Suspense boundary = skeleton while loading) */}
      <Suspense key={query + status + currentPage} fallback={<JobsTableSkeleton />}>
        <JobsTable query={query} status={status} currentPage={currentPage} />
      </Suspense>

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
