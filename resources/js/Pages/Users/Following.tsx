import React from 'react';
import useScrollingFeed from '@/Hooks/useScrollingFeed';
import useRoute from '@/Hooks/useRoute';
import { User } from '@/types';
import UserFollowLayout from '@/Layouts/UserFollowLayout';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
  profile: User;
}

export default function UsersFollowing({ profile }: Props) {
  const route = useRoute();
  const { items, loading } = useScrollingFeed<User>({
    feedUrl: route('api.users.following.index', [profile]),
  });

  return (
    <div>
      <div>
        {items.map(user => (
          <InertiaLink
            key={user.id}
            className={'flex space-x-2 p-4'}
            href={route('users.show', [user])}
          >
            <img
              src={user.profile_photo_path}
              alt=""
              className={'block rounded-full w-10 h-10'}
            />
            <div>
              <p className={'text-white font-bold'}>{user.name}</p>
              <p className={'text-gray-500 -mt-1'}>@{user.username}</p>
              <p className={'text-white mt-1 leading-snug'}>
                {user.bio || 'no bio'}
              </p>
            </div>
          </InertiaLink>
        ))}
        {loading && <p className={'p-6'}>Loading...</p>}
      </div>
    </div>
  );
}

UsersFollowing.layout = (page: any) => {
  return <UserFollowLayout {...page.props} children={page} />;
};
