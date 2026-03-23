export function JobsTableSkeleton() {
  return (
    <div className="mt-6 flow-root animate-pulse">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full md:table">
            <thead>
              <tr className="bg-gray-50">
                {Array.from({ length: 9 }).map((_, i) => (
                  <th key={i} className="px-3 py-5">
                    <div className="h-3 rounded bg-gray-200 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.from({ length: 8 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b">
                  {Array.from({ length: 9 }).map((_, colIdx) => (
                    <td key={colIdx} className="px-3 py-4">
                      <div className={`h-3 rounded bg-gray-100 ${colIdx === 0 ? 'w-36' : 'w-20'}`} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
