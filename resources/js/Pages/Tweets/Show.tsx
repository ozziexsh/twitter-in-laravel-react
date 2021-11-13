import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { StarIcon } from '@heroicons/react/outline';
import { Tweet, User } from '@/types';
import TweetCard from '@/Components/TweetCard';

interface Props {
  tweet: Tweet & { user: User };
}

export default function TweetsShow({ tweet }: Props) {
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

      <TweetCard key={tweet.id} tweet={tweet} user={tweet.user} />
    </AppLayout>
  );
}
