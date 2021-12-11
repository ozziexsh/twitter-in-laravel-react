import React from 'react';
import TweetActionButton, { ButtonColor } from '@/Components/TweetActionButton';
import useRoute from '@/Hooks/useRoute';
import useTweetLikes from '@/Hooks/useTweetLikes';
import { FeedTweet } from '@/types';
import {
  ChatIcon,
  HeartIcon,
  RefreshIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import TweetAvatarHover from '@/Components/TweetAvatarHover';
import TweetBody from '@/Components/TweetBody';

interface Props {
  tweet: FeedTweet;
}

export default function TweetCard({ tweet }: Props) {
  const { user } = tweet;
  const route = useRoute();
  const { likes, liked, onLikeClick } = useTweetLikes({ tweet });

  function onTweetClick(e: React.MouseEvent<HTMLDivElement>) {
    Inertia.visit(route('tweets.show', [tweet]), { preserveScroll: true });
  }

  function onUsernameClick(
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.KeyboardEvent<HTMLAnchorElement>,
  ) {
    e.stopPropagation();
  }

  return (
    <div
      className={'flex p-4 cursor-pointer hover:bg-white hover:bg-opacity-10'}
      onClick={onTweetClick}
    >
      <div className={'pr-4'}>
        <TweetAvatarHover username={tweet.user.username}>
          <img
            src={user.profile_photo_path}
            alt=""
            className={'block rounded-full w-10 h-10'}
          />
        </TweetAvatarHover>
      </div>
      <div className={'flex-1 -mt-1'}>
        <TweetAvatarHover username={tweet.user.username}>
          <InertiaLink
            href={route('users.show', [user])}
            onClick={onUsernameClick}
            preserveScroll={true}
            className={'inline-flex items-center space-x-1 text-sm group'}
          >
            <span className={'font-bold group-hover:underline'}>
              {user.name}
            </span>
            <span className={'text-gray-400'}>@{user.username}</span>
          </InertiaLink>
        </TweetAvatarHover>
        <TweetBody body={tweet.body} />
        <div
          className={
            '-ml-2 mt-1 flex items-center justify-between text-gray-400 w-3/4 text-sm'
          }
        >
          <TweetActionButton
            icon={ChatIcon}
            label={tweet.replies_count}
            color={ButtonColor.brand}
          />
          <TweetActionButton
            icon={HeartIcon}
            label={likes}
            color={ButtonColor.red}
            onClick={onLikeClick}
            active={liked}
          />
          <TweetActionButton
            icon={RefreshIcon}
            label={0}
            color={ButtonColor.green}
          />
          <TweetActionButton icon={ShareIcon} color={ButtonColor.brand} />
        </div>
      </div>
    </div>
  );
}
