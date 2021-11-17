import { useEffect, useState } from 'react';
import useAxios from '@/Hooks/useAxios';
import { PaginationResponse } from '@/types';

export default function useScrollingFeed<T>({ feedUrl }: { feedUrl: string }) {
  const [feed, setFeed] = useState<PaginationResponse<T> | null>(null);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  function getNextFeedUrl() {
    if (feed) {
      return feed.next_page_url;
    }
    return feedUrl;
  }

  async function fetchFeed() {
    const url = getNextFeedUrl();
    if (loading || !url) {
      return;
    }
    setLoading(true);
    const res = await axios.get(url);
    setLoading(false);
    setFeed(res.data.feed);
    setItems(old => [...old, ...res.data.feed.data]);
  }

  async function refresh() {
    setLoading(true);
    const res = await axios.get(feedUrl);
    setLoading(false);
    setFeed(res.data.feed);
    setItems(res.data.feed.data);
  }

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    function listener(e: any) {
      if (
        e.currentTarget?.scrollTop >=
        e.currentTarget?.scrollHeight - e.currentTarget?.offsetHeight
      ) {
        fetchFeed();
      }
    }
    const el = document.querySelector('[scroll-region]');
    el?.addEventListener('scroll', listener);
    return () => el?.removeEventListener('scroll', listener);
  }, [fetchFeed]);

  return { feed, items, loading, refresh };
}
