import { fetchJobs } from '@/app/lib/data';
import JobStatus from '@/app/ui/jobs/status';
import { EditJob, DeleteJob } from '@/app/ui/jobs/buttons';

function formatCurrency(val: number | null) {
  if (val == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function formatRatio(val: number | null) {
  if (val == null) return '—';
  return `${(val * 100).toFixed(0)}%`;
}

export default async function JobsTable({
  query,
  status,
  currentPage,
}: {
  query: string;
  status: string;
  currentPage: number;
}) {
  const { jobs } = await fetchJobs({ query, status: status || undefined, page: currentPage });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile cards */}
          <div className="md:hidden">
            {jobs.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-500">No jobs found.</p>
            )}
            {jobs.map((job) => (
              <div key={job.id} className="mb-2 w-full rounded-md bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{job.jobTitle}</p>
                    <p className="text-sm text-gray-500">{job.department} · {job.level}</p>
                  </div>
                  <JobStatus status={job.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📍 {job.location}</p>
                    <p>Market: {formatCurrency(job.marketMedian)}</p>
                    <p>Internal: {formatCurrency(job.internalMedian)}</p>
                    <p>Compa: {formatRatio(job.compaRatio)}</p>
                  </div>
                  <div className="flex gap-2">
                    <EditJob id={job.id} />
                    <DeleteJob id={job.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {['Job Title', 'Department', 'Level', 'Location', 'Market Median', 'Internal Median', 'Compa Ratio', 'Status', ''].map((h) => (
                  <th key={h} scope="col" className="px-3 py-5 font-semibold first:pl-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-gray-400">
                    No jobs found. Try a different search.
                  </td>
                </tr>
              )}
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="text-sm last-of-type:border-none hover:bg-gray-50 transition-colors
                    [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg
                    [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 font-medium">{job.jobTitle}</td>
                  <td className="whitespace-nowrap px-3 py-3">{job.department}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{job.level}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500">{job.location}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono">{formatCurrency(job.marketMedian)}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono">{formatCurrency(job.internalMedian)}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        job.compaRatio == null
                          ? 'text-gray-400'
                          : job.compaRatio >= 1
                          ? 'text-green-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {formatRatio(job.compaRatio)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <JobStatus status={job.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-3 pr-6">
                    <div className="flex justify-end gap-2">
                      <EditJob id={job.id} />
                      <DeleteJob id={job.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
