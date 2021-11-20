import TweetActionButton, { ButtonColor } from '@/Components/TweetActionButton';
import useAxios from '@/Hooks/useAxios';
import useRoute from '@/Hooks/useRoute';
import { FeedTweet } from '@/types';
import {
  ChatIcon,
  HeartIcon,
  RefreshIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import React, { useState } from 'react';

interface Props {
  tweet: FeedTweet;
}

export default function TweetCard({ tweet }: Props) {
  const { user, likes_count } = tweet;
  const route = useRoute();
  const axios = useAxios();
  const [liked, setLiked] = useState(tweet.liked);
  const [likes, setLikes] = useState(likes_count);

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

  function onLikeClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (liked) {
      axios.delete(route('tweets.likes.destroy', [tweet]));
      setLiked(false);
      setLikes(l => l - 1);
    } else {
      axios.post(route('tweets.likes.store', [tweet]));
      setLiked(true);
      setLikes(l => l + 1);
    }
  }

  return (
    <div
      className={'flex p-4 cursor-pointer hover:bg-white hover:bg-opacity-10'}
      onClick={onTweetClick}
    >
      <div className={'pr-4'}>
        <img
          src="https://via.placeholder.com/100"
          alt=""
          className={'block rounded-full w-10 h-10'}
        />
      </div>
      <div className={'flex-1 -mt-1'}>
        <InertiaLink
          href={route('users.show', [user])}
          onClick={onUsernameClick}
          className={'inline-flex items-center space-x-1 text-sm'}
          preserveScroll={true}
        >
          <span className={'font-bold'}>{user.name}</span>
          <span className={'text-gray-400'}>@{user.username}</span>
        </InertiaLink>
        {tweet.body.split('\n').map((text, i) => (
          <p key={i}>{text}</p>
        ))}
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
