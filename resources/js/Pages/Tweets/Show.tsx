import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ChatIcon,
  HeartIcon,
  RefreshIcon,
  ShareIcon,
  StarIcon,
} from '@heroicons/react/outline';
import { FeedTweet } from '@/types';
import TweetCard from '@/Components/TweetCard';
import Divider from '@/Components/Divider';
import useRoute from '@/Hooks/useRoute';
import { InertiaLink } from '@inertiajs/inertia-react';
import TweetActionButton, { ButtonColor } from '@/Components/TweetActionButton';
import useAxios from '@/Hooks/useAxios';
import useTweetLikes from '@/Hooks/useTweetLikes';
import TweetAvatarHover from '@/Components/TweetAvatarHover';
import useUser from '@/Hooks/useUser';

interface Props {
  tweet: FeedTweet;
  replies: FeedTweet[];
}

export default function TweetsShow({ tweet, replies }: Props) {
  const user = useUser();
  const route = useRoute();
  const [body, setBody] = useState('');
  const axios = useAxios();
  const { liked, likes, onLikeClick } = useTweetLikes({ tweet });

  async function submiyReply() {
    const res = await axios.post(route('api.tweets.replies.store', [tweet]), {
      body,
    });
    setBody('');
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

      <div className={'px-4 pt-4'}>
        <div className={'flex'}>
          <TweetAvatarHover username={tweet.user.username}>
            <InertiaLink
              href={route('users.show', [tweet.user])}
              preserveScroll={true}
            >
              <img
                src={tweet.user.profile_photo_path}
                className={'block rounded-full w-12 h-12'}
              />
            </InertiaLink>
          </TweetAvatarHover>
          <div className={'ml-2'}>
            <TweetAvatarHover username={tweet.user.username}>
              <InertiaLink
                href={route('users.show', [tweet.user])}
                className={'flex flex-col text-sm group'}
                preserveScroll={true}
              >
                <span className={'font-bold group-hover:underline'}>
                  {tweet.user.name}
                </span>
                <span className={'text-gray-400'}>@{tweet.user.username}</span>
              </InertiaLink>
            </TweetAvatarHover>
          </div>
        </div>
        <div className={'mt-4 text-2xl text-white'}>
          <p>{tweet.body}</p>
        </div>
        <InertiaLink
          href={route('tweets.show', [tweet])}
          className={'block text-gray-500 text-sm mt-2 hover:underline'}
        >
          {tweet.created_at}
        </InertiaLink>

        <div className="mt-4">
          <Divider />
          <div className={'flex space-x-4 py-4'}>
            <InertiaLink
              className={'flex items-center space-x-1 hover:underline'}
              href={'#'}
            >
              <span>
                <span className={'font-bold'}>0</span>{' '}
                <span className={'text-gray-400'}>Retweets</span>
              </span>
            </InertiaLink>
            <InertiaLink
              className={'flex items-center space-x-1 hover:underline'}
              href={'#'}
            >
              <span>
                <span className={'font-bold'}>{likes}</span>{' '}
                <span className={'text-gray-400'}>Likes</span>
              </span>
            </InertiaLink>
          </div>
          <Divider />
        </div>

        <div className={'flex justify-around items-center py-2 text-gray-500'}>
          <TweetActionButton
            icon={ChatIcon}
            color={ButtonColor.brand}
            iconClassName={'w-6 h-6'}
          />
          <TweetActionButton
            icon={RefreshIcon}
            color={ButtonColor.green}
            iconClassName={'w-6 h-6'}
          />
          <TweetActionButton
            icon={HeartIcon}
            color={ButtonColor.red}
            iconClassName={'w-6 h-6'}
            active={liked}
            onClick={onLikeClick}
          />
          <TweetActionButton
            icon={ShareIcon}
            color={ButtonColor.brand}
            iconClassName={'w-6 h-6'}
          />
        </div>
        <Divider />
      </div>

      <div className={'px-4'}>
        <div className={'flex items-center space-x-2 py-2'}>
          <div>
            <img
              src={user.profile_photo_path}
              className={'w-12 h-12 rounded-full'}
            />
          </div>
          <textarea
            className={'bg-transparent border-0 p-2 flex-1 resize-none rounded'}
            placeholder={'Tweet your reply'}
            value={body}
            onChange={e => setBody(e.currentTarget.value)}
          />
          <button
            className={'text-white bg-brand rounded-full px-4 py-2 font-bold'}
            onClick={submiyReply}
          >
            Reply
          </button>
        </div>
      </div>

      <div className="border-t border-divider divide-y divide-divider">
        {replies.map(reply => (
          <TweetCard key={reply.id} tweet={reply} />
        ))}
      </div>
    </AppLayout>
  );
}
