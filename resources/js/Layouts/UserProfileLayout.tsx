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
import TabLinks from '@/Components/TabLinks';
import Button from '@/Components/Button';
import EditProfileModal from '@/Domains/Profile/EditProfileModal';

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
  const [editingProfile, setEditingProfile] = useState(false);

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
          <InertiaLink href={route('home')}>
            <ArrowLeftIcon className={'w-6 h-6'} />
          </InertiaLink>
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
                  return (
                    <Button
                      appearance={'outlined'}
                      color={'white'}
                      onClick={() => setEditingProfile(true)}
                    >
                      Edit Profile
                    </Button>
                  );
                }
                if (isFollowing) {
                  return (
                    <Button
                      appearance={'filled'}
                      color={'white'}
                      onClick={unfollow}
                    >
                      Unfollow
                    </Button>
                  );
                }
                return (
                  <Button
                    appearance={'outlined'}
                    color={'white'}
                    onClick={follow}
                  >
                    Follow
                  </Button>
                );
              })()}
            </div>
          </div>
          <h2 className={'font-bold text-lg pt-16'}>{profile.name}</h2>
          <p className={'text-gray-400 text-sm'}>@{profile.username}</p>
          <p className={'mt-2 leading-snug'}>
            {profile.bio || <span className={'italic'}>no bio</span>}
          </p>
          <div className={'flex items-center space-x-4 text-gray-400 mt-2'}>
            {profile.location && (
              <div className={'flex items-center space-x-1'}>
                <LocationMarkerIcon className={'w-4 h-4'} />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className={'flex items-center space-x-1'}>
                <LinkIcon className={'w-4 h-4'} />
                <InertiaLink className={'text-brand'} href={profile.website}>
                  {profile.website?.replace(/^https?:\/\//, '')}
                </InertiaLink>
              </div>
            )}
            <div className={'flex items-center space-x-1'}>
              <CalendarIcon className={'w-4 h-4'} />
              <span>Joined {profile.created_at.substr(0, 10)}</span>
            </div>
          </div>
          <div className={'flex items-center space-x-4 mt-2'}>
            <InertiaLink
              className={'flex items-center space-x-1 hover:underline'}
              href={route('users.following.index', [profile])}
            >
              <span>
                <span className={'font-bold'}>{followingCount}</span>{' '}
                <span className={'text-gray-400'}>Following</span>
              </span>
            </InertiaLink>
            <InertiaLink
              className={'flex items-center space-x-1 hover:underline'}
              href={route('users.followers.index', [profile])}
            >
              <span>
                <span className={'font-bold'}>{followersCount}</span>{' '}
                <span className={'text-gray-400'}>Followers</span>
              </span>
            </InertiaLink>
          </div>
        </div>
      </div>

      <div className={'mt-4'}>
        <TabLinks
          links={[
            {
              label: 'Tweets',
              href: route('users.show', [profile]),
              active: route().current('users.show', [profile]),
            },
            { label: 'Tweets & Replies', href: '#', active: false },
            { label: 'Media', href: '#', active: false },
            {
              label: 'Likes',
              href: route('users.likes.index', [profile]),
              active: route().current('users.likes.index', [profile]),
            },
          ]}
        />
      </div>

      {children}

      <EditProfileModal
        user={profile}
        isOpen={editingProfile}
        onClose={() => setEditingProfile(false)}
      />
    </AppLayout>
  );
}
