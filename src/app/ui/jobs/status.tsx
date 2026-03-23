type StatusVariant = 'active' | 'draft' | 'archived';

const CONFIG: Record<StatusVariant, { label: string; classes: string }> = {
  active: { label: 'Active', classes: 'bg-green-100 text-green-800' },
  draft: { label: 'Draft', classes: 'bg-yellow-100 text-yellow-800' },
  archived: { label: 'Archived', classes: 'bg-gray-100 text-gray-500' },
};

export default function JobStatus({ status }: { status: string }) {
  const cfg = CONFIG[status as StatusVariant] ?? { label: status, classes: 'bg-gray-100 text-gray-500' };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}
