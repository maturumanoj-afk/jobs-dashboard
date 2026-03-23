'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Finance', 'HR', 'Data', 'Marketing', 'Legal', 'Operations'];
const LEVELS = ['Junior', 'Mid', 'Senior', 'Lead', 'Principal', 'Executive'];
const STATUSES = ['active', 'draft', 'archived'];
const EMP_TYPES = ['full_time', 'part_time', 'contract'];

export default function CreateJobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    const input = {
      jobTitle: fd.get('jobTitle') as string,
      department: fd.get('department') as string,
      level: fd.get('level') as string,
      location: fd.get('location') as string,
      marketMedian: fd.get('marketMedian') ? Number(fd.get('marketMedian')) : undefined,
      internalMedian: fd.get('internalMedian') ? Number(fd.get('internalMedian')) : undefined,
      status: fd.get('status') as string,
      employmentType: fd.get('employmentType') as string,
      remoteEligible: fd.get('remoteEligible') === 'on',
      headcountBudget: fd.get('headcountBudget') ? Number(fd.get('headcountBudget')) : undefined,
    };
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation CreateJob($input: JobInput!) { createJob(input: $input) { id } }`,
          variables: { input },
        }),
      });
      const json = await res.json();
      if (json.errors) throw new Error(json.errors[0].message);
      router.push('/dashboard/jobs');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Job Title" name="jobTitle" required />
        <SelectField label="Department" name="department" options={DEPARTMENTS} required />
        <SelectField label="Level" name="level" options={LEVELS} required />
        <Field label="Location" name="location" required placeholder="e.g. San Francisco, CA or Remote" />
        <Field label="Market Median (USD)" name="marketMedian" type="number" min={0} />
        <Field label="Internal Median (USD)" name="internalMedian" type="number" min={0} />
        <SelectField label="Status" name="status" options={STATUSES} defaultValue="active" required />
        <SelectField label="Employment Type" name="employmentType" options={EMP_TYPES} defaultValue="full_time" required />
        <Field label="Headcount Budget" name="headcountBudget" type="number" min={1} defaultValue="1" />
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="remoteEligible" name="remoteEligible" className="rounded" />
          <label htmlFor="remoteEligible" className="text-sm font-medium text-gray-700">Remote Eligible</label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Create Job'}
        </button>
        <Link href="/dashboard/jobs" className="rounded-lg border px-6 py-2 text-sm text-gray-700 hover:bg-gray-50">
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', required = false, min, placeholder, defaultValue }: {
  label: string; name: string; type?: string; required?: boolean; min?: number; placeholder?: string; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}{required && ' *'}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        min={min}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function SelectField({ label, name, options, required = false, defaultValue }: {
  label: string; name: string; options: string[]; required?: boolean; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}{required && ' *'}</label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o.replace('_', ' ')}</option>)}
      </select>
    </div>
  );
}
