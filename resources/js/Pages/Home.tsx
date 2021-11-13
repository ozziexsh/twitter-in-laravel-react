import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { StarIcon } from '@heroicons/react/outline';
import TweetForm from '@/Components/TweetForm';
import { FeedTweet, Tweet, User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import TweetCard from '@/Components/TweetCard';

interface Props {
  tweets: FeedTweet[];
}

export default function Home({ tweets }: Props) {
  function onTweetCreated(tweet: Tweet) {
    Inertia.reload({ preserveScroll: true });
  }

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
        <TweetForm onCreate={onTweetCreated} />
      </div>

      <div className={'divide-y divide-divider'}>
        {tweets.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </AppLayout>
  );
}
