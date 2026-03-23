import CreateJobForm from '@/app/ui/jobs/create-form';
import Link from 'next/link';

export default function CreateJobPage() {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/jobs" className="text-sm text-blue-700 hover:underline">
          ← Back to Jobs Library
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Job</h1>
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
        <CreateJobForm />
      </div>
    </div>
  );
}
