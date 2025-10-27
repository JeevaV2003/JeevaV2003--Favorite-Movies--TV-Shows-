import { useEffect, useRef } from 'react';
import EntryRow from '../components/EntryRow';
import { useInfiniteEntries } from '../hooks/useInfiniteEntries';

export default function EntryTable({ initialItems = [], staticList = false }: any) {
  const { items, loadMore, loading, hasMore, setItems } = useInfiniteEntries(20, staticList);
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (staticList) setItems(initialItems || []);
  }, [initialItems, staticList, setItems]);

  useEffect(() => {
    const io = new IntersectionObserver(entries => { if (entries[0].isIntersecting && hasMore && !loading && !staticList) loadMore(); });
    if (sentinel.current) io.observe(sentinel.current);
    return () => io.disconnect();
  }, [loadMore, hasMore, loading, staticList]);

  const list = items || [];
    return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poster</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {list.map((it: any) => <EntryRow key={it.id} entry={it} />)}
        </tbody>
      </table>
      <div ref={sentinel} className="h-10" />
      {loading && <div className="text-center py-4">Loading...</div>}
      {!hasMore && !loading && <div className="text-center py-4 text-gray-500">No more items</div>}
    </div>
  );
}
