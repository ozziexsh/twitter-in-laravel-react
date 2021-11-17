import React, { PropsWithChildren, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowLeftIcon,
  CalendarIcon,
  LinkIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import { User } from '@/types';
import { InertiaLink } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';
import useAxios from '@/Hooks/useAxios';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  profile: User;
  following: boolean;
  tweets_count: number;
  following_count: number;
  followers_count: number;
}

export default function UserProfileLayout({
  profile,
  following,
  tweets_count: tweetsCount,
  followers_count,
  following_count: followingCount,
  children,
}: PropsWithChildren<Props>) {
  const [isFollowing, setIsFollowing] = useState(following);
  const [followersCount, setFollowersCount] = useState(followers_count);
  const route = useRoute();
  const axios = useAxios();
  const {
    props: { user },
  } = useTypedPage();

  async function follow() {
    await axios.post(route('users.followers.store', [profile]));
    setIsFollowing(true);
    setFollowersCount(f => f + 1);
  }

  async function unfollow() {
    await axios.delete(route('users.followers.destroy', [profile]));
    setIsFollowing(false);
    setFollowersCount(f => f - 1);
  }

  return (
    <AppLayout title={`${profile.name} (${profile.username})`}>
      <div
        className={
          'flex items-center justify-between p-4 border-b border-divider'
        }
      >
        <div className={'flex items-center space-x-4'}>
          <ArrowLeftIcon className={'w-6 h-6'} />
          <div>
            <h2 className={'text-xl font-semibold'}>{profile.name}</h2>
            <p className={'text-gray-400'}>{tweetsCount} tweets</p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-gray-400 h-48" />
        <div className={'relative px-4'}>
          <div className={'relative flex justify-between pt-4'}>
            <img
              src="https://via.placeholder.com/250"
              alt=""
              className={
                'rounded-full absolute left-0 border-4 border-black block w-1/5'
              }
              style={{ transform: 'translateY(-50%)' }}
            />
            <div></div>
            <div>
              {(() => {
                if (user?.id === profile.id) {
                  return <button>Edit Profile</button>;
                }
                if (isFollowing) {
                  return <button onClick={unfollow}>Unfollow</button>;
                }
                return <button onClick={follow}>Follow</button>;
              })()}
            </div>
          </div>
          <h2 className={'font-bold text-lg pt-16'}>{profile.name}</h2>
          <p className={'text-gray-400 text-sm'}>@{profile.username}</p>
          <p className={'mt-2 leading-tight'}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            numquam tempore, aliquam reprehenderit laboriosam
          </p>
          <div className={'flex items-center space-x-4 text-gray-400 mt-2'}>
            <div className={'flex items-center space-x-1'}>
              <LocationMarkerIcon className={'w-4 h-4'} />
              <span>Canada</span>
            </div>
            <div className={'flex items-center space-x-1'}>
              <LinkIcon className={'w-4 h-4'} />
              <InertiaLink className={'text-brand'} href={'#'}>
                ozzie.sh
              </InertiaLink>
            </div>
            <div className={'flex items-center space-x-1'}>
              <CalendarIcon className={'w-4 h-4'} />
              <span>Joined {profile.created_at.substr(0, 10)}</span>
            </div>
          </div>
          <div className={'flex items-center space-x-4 mt-2'}>
            <div className={'flex items-center space-x-1'}>
              <span className={'font-bold'}>{followingCount}</span>
              <span className={'text-gray-400'}>Following</span>
            </div>
            <div className={'flex items-center space-x-1'}>
              <span className={'font-bold'}>{followersCount}</span>
              <span className={'text-gray-400'}>Followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className={'flex border-b border-divider mt-4'}>
        {[
          {
            text: 'Tweets',
            href: route('users.show', [profile]),
            active: route().current('users.show', [profile]),
          },
          { text: 'Tweets & Replies', href: '#', active: false },
          { text: 'Media', href: '#', active: false },
          {
            text: 'Likes',
            href: route('users.likes.index', [profile]),
            active: route().current('users.likes.index', [profile]),
          },
        ].map(item => (
          <InertiaLink
            href={item.href}
            className={
              'inline-block text-center flex-grow hover:bg-white hover:bg-opacity-10 text-gray-400 font-bold h-14'
            }
            key={item.text}
            preserveScroll={true}
          >
            <div className={'relative inline-flex items-center h-full'}>
              <span>{item.text}</span>
              {item.active && (
                <div
                  className={
                    'bg-brand h-1 rounded w-full absolute bottom-0 left-0'
                  }
                ></div>
              )}
            </div>
          </InertiaLink>
        ))}
      </div>

      {children}
    </AppLayout>
  );
}
