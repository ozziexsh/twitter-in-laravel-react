import React, { useEffect, useState } from 'react';
import useAxios from '@/Hooks/useAxios';
import { FeedTweet, PaginationResponse } from '@/types';

export default function useTweetFeed({ feedUrl }: { feedUrl: string }) {
  const [feed, setFeed] = useState<PaginationResponse<FeedTweet> | null>(null);
  const [items, setItems] = useState<FeedTweet[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  function getNextFeedUrl() {
    if (feed) {
      return feed.next_page_url;
    }
    return feedUrl;
  }

  async function fetchTweets() {
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

  function onMainContentScroll(e: React.UIEvent<HTMLDivElement>) {
    // check if scrolled to bottom of div https://stackoverflow.com/a/24356615/2348553
    if (
      e.currentTarget.scrollTop >=
      e.currentTarget.scrollHeight - e.currentTarget.offsetHeight
    ) {
      fetchTweets();
    }
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  useEffect(() => {
    function listener(e: any) {
      if (
        e.currentTarget?.scrollTop >=
        e.currentTarget?.scrollHeight - e.currentTarget?.offsetHeight
      ) {
        fetchTweets();
      }
    }
    const el = document.querySelector('[scroll-region]');
    el?.addEventListener('scroll', listener);
    return () => el?.removeEventListener('scroll', listener);
  }, [fetchTweets]);

  return { feed, items, loading, onMainContentScroll, refresh };
}
