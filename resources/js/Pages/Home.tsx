import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {
  StarIcon,
  ChatIcon,
  HeartIcon,
  RefreshIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import TweetForm from '@/Components/TweetForm';
import { Tweet, User } from '@/types';
import { Inertia } from '@inertiajs/inertia';

interface Props {
  tweets: Array<Tweet & { user: User }>;
}

export default function Home({ tweets }: Props) {
  function onTweetCreated(tweet: Tweet) {
    Inertia.reload({ preserveScroll: true });
  }

  return (
    <AppLayout title="Home">
      <div
        className={
          'flex items-center justify-between p-4 border-b border-gray-50'
        }
      >
        <h2 className={'text-xl font-semibold'}>Home</h2>
        <StarIcon className={'w-6 h-6'} />
      </div>

      <div className="border-b border-gray-50">
        <TweetForm onCreate={onTweetCreated} />
      </div>

      <div className={'divide-y divide-gray-50'}>
        {tweets.map(tweet => (
          <div className={'flex p-4'} key={tweet.id}>
            <div className={'pr-4'}>
              <img
                src="https://via.placeholder.com/100"
                alt=""
                className={'block rounded-full w-12 h-12'}
              />
            </div>
            <div className={'flex-1'}>
              <div className={'flex items-center space-x-1'}>
                <span className={'font-bold'}>{tweet.user.name}</span>
                <span className={'text-gray-400'}>@{tweet.user.username}</span>
              </div>
              {tweet.body.split('\n').map((text, i) => (
                <p key={i}>{text}</p>
              ))}
              <div
                className={
                  'mt-2 flex items-center justify-between text-gray-400 w-3/4 text-sm'
                }
              >
                <button
                  className={'flex items-center space-x-4 hover:text-blue-400'}
                >
                  <ChatIcon className={'w-4 h-4'} />
                  <span>0</span>
                </button>
                <button
                  className={'flex items-center space-x-4 hover:text-red-400'}
                >
                  <HeartIcon className={'w-4 h-4'} />
                  <span>0</span>
                </button>
                <button
                  className={'flex items-center space-x-4 hover:text-green-400'}
                >
                  <RefreshIcon className={'w-4 h-4'} />
                  <span>0</span>
                </button>
                <button
                  className={'flex items-center space-x-4 hover:text-blue-400'}
                >
                  <ShareIcon className={'w-4 h-4'} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
