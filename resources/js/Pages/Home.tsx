import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { StarIcon } from '@heroicons/react/outline';
import TweetForm from '@/Components/TweetForm';
import TweetCard from '@/Components/TweetCard';
import useRoute from '@/Hooks/useRoute';
import useScrollingFeed from '@/Hooks/useScrollingFeed';
import { FeedTweet } from '@/types';

export default function Home() {
  const route = useRoute();
  const { feed, items, loading, refresh } = useScrollingFeed<FeedTweet>({
    feedUrl: route('api.feed'),
  });

  return (
    <AppLayout title="Home">
      <div
        className={
          'flex items-center justify-between p-4 border-b border-divider'
        }
      >
        <h2 className={'text-xl font-semibold'}>Home</h2>
        <StarIcon className={'w-6 h-6'} />
      </div>

      <div className="border-b border-divider">
        <TweetForm onCreate={refresh} />
      </div>

      {feed && (
        <div className={'divide-y divide-divider'}>
          {items.map(tweet => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
          {loading && <p className={'p-6'}>Loading...</p>}
        </div>
      )}
    </AppLayout>
  );
}
