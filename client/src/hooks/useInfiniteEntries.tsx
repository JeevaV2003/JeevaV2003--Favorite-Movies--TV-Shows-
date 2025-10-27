import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchEntries } from '../api/entries';

export function useInfiniteEntries(limit = 20, disabled = false) {
  const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);
  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    setLoading(true);
    try {
      const res = await fetchEntries(nextCursor ?? undefined, limit);

      const data = res.data as any[];
      setItems(prev => [...prev, ...data]);
      setNextCursor(res.nextCursor);
      if (!res.nextCursor || data.length < limit) setHasMore(false);
        } finally {
      loadingRef.current = false;
      setLoading(false);
    }
    }, [loading, hasMore, nextCursor, limit]);

    useEffect(() => {
    if (!disabled) {
      loadMore();
    }
  }, [disabled, loadMore]);


  return { items, setItems, loadMore, loading, hasMore, setNextCursor };
}
