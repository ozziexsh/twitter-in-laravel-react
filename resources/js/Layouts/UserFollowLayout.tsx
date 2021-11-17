import React, { PropsWithChildren } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { User } from '@/types';
import useRoute from '@/Hooks/useRoute';
import TabLinks from '@/Components/TabLinks';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
  profile: User;
}

export default function UserFollowLayout({
  profile,
  children,
}: PropsWithChildren<Props>) {
  const route = useRoute();

  return (
    <AppLayout title={`${profile.name} (${profile.username})`}>
      <div
        className={
          'flex items-center justify-between p-4 border-b border-divider'
        }
      >
        <div className={'flex items-center space-x-4'}>
          <InertiaLink href={route('users.show', [profile])}>
            <ArrowLeftIcon className={'w-6 h-6'} />
          </InertiaLink>
          <div>
            <h2 className={'text-xl font-semibold'}>{profile.name}</h2>
            <p className={'text-gray-400'}>@{profile.username}</p>
          </div>
        </div>
      </div>

      <TabLinks
        links={[
          {
            label: 'Followers',
            href: route('users.followers.index', [profile]),
            active: route().current('users.followers.index', [profile]),
          },
          {
            label: 'Following',
            href: route('users.following.index', [profile]),
            active: route().current('users.following.index', [profile]),
          },
        ]}
      />

      {children}
    </AppLayout>
  );
}
