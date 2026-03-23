'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const STATUS_OPTIONS = ['', 'active', 'draft', 'archived'];
const STATUS_LABELS: Record<string, string> = {
  '': 'All Statuses',
  active: 'Active',
  draft: 'Draft',
  archived: 'Archived',
};

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const current = searchParams.get('status') || '';

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) params.set('status', value);
    else params.delete('status');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      id="status-filter"
      value={current}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-md border border-gray-200 py-[9px] px-3 text-sm text-gray-700 outline-2"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
      ))}
    </select>
  );
}
