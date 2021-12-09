import React, { PropsWithChildren, useState } from 'react';
import { FeedTweet } from '@/types';
import * as HoverCard from '@radix-ui/react-hover-card';
import { InertiaLink } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';
import Button from '@/Components/Button';
import useUserSummary from '@/Hooks/useUserSummary';
import useFollow from '@/Hooks/useFollow';

export default function TweetAvatarHover({
  tweet,
  children,
}: PropsWithChildren<{ tweet: FeedTweet }>) {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const { data: summary } = useUserSummary(open ? tweet.user.username : null);
  const { follow, unfollow, followersCount, isFollowing } = useFollow({
    initialFollowersCount: summary?.followers_count,
    initialIsFollowing: summary?.is_following,
    user: tweet.user,
  });

  return (
    <HoverCard.Root openDelay={300} onOpenChange={setOpen}>
      <HoverCard.Trigger>{children}</HoverCard.Trigger>

      <HoverCard.Content className="shadow bg-black rounded-md border border-divider p-4 w-72">
        <HoverCard.Arrow />
        <div className={'flex items-center justify-between'}>
          <img
            src="https://via.placeholder.com/200"
            alt=""
            className={'w-14 h-14 rounded-full'}
          />
          <Button
            appearance={isFollowing ? 'filled' : 'outlined'}
            color={'white'}
            onClick={e => {
              e.stopPropagation();
              isFollowing ? unfollow() : follow();
            }}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
        <div className={'mt-1'}>
          <p className={'text-white font-bold'}>{tweet.user.name}</p>
          <p className={'text-gray-500 -mt-1'}>@{tweet.user.username}</p>
          <p className={'text-white mt-2 leading-snug'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum est
            earum commodi voluptatum dolores repudiandae{' '}
          </p>
          <div className={'text-white flex items-center space-x-4 mt-2'}>
            <InertiaLink
              className={'flex items-center space-x-1 hover:underline'}
              href={route('users.following.index', [tweet.user])}
            >
              <span>
                <span className={'font-bold'}>
                  {summary?.following_count ?? '-'}
                </span>{' '}
                <span className={'text-gray-400'}>Following</span>
              </span>
            </InertiaLink>
            <InertiaLink
              className={'flex items-center space-x-1 hover:underline'}
              href={route('users.followers.index', [tweet.user])}
            >
              <span>
                <span className={'font-bold'}>{followersCount ?? '-'}</span>{' '}
                <span className={'text-gray-400'}>Followers</span>
              </span>
            </InertiaLink>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
