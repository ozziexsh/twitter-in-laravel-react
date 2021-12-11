import React, { PropsWithChildren, useState } from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { InertiaLink } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';
import Button from '@/Components/Button';
import useUserSummary from '@/Hooks/useUserSummary';
import useFollow from '@/Hooks/useFollow';

export default function TweetAvatarHover({
  username,
  children,
}: PropsWithChildren<{ username: string }>) {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const { data: summary } = useUserSummary(open ? username : null);
  const { follow, unfollow, followersCount, isFollowing } = useFollow({
    initialFollowersCount: summary?.followers_count,
    initialIsFollowing: summary?.is_following,
    username,
  });

  return (
    <HoverCard.Root openDelay={300} onOpenChange={setOpen}>
      <HoverCard.Trigger asChild={true}>{children}</HoverCard.Trigger>

      <HoverCard.Content className="shadow bg-black rounded-md border border-divider p-4 w-72">
        <HoverCard.Arrow />
        <div className={'flex items-center justify-between'}>
          <InertiaLink
            href={route('users.show', [username])}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={summary?.user.profile_photo_path}
              alt=""
              className={'w-14 h-14 rounded-full'}
            />
          </InertiaLink>
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
          <InertiaLink
            href={route('users.show', [username])}
            onClick={e => e.stopPropagation()}
            className={'group'}
          >
            <p className={'text-white font-bold group-hover:underline'}>
              {summary?.user.name}
            </p>
            <p className={'text-gray-500 -mt-1'}>@{summary?.user.username}</p>
          </InertiaLink>
          <p className={'text-white mt-2 leading-snug'}>
            {summary?.user.bio || 'no bio'}
          </p>
          <div className={'text-white flex items-center space-x-4 mt-2'}>
            <InertiaLink
              className={'flex items-center space-x-1 hover:underline'}
              href={route('users.following.index', [username])}
              onClick={e => e.stopPropagation()}
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
              href={route('users.followers.index', [username])}
              onClick={e => e.stopPropagation()}
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
