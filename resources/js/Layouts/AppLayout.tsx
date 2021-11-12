import { Inertia } from '@inertiajs/inertia';
// @ts-ignore
import { InertiaLink, Head } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Team } from '@/types';
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  ViewListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  SunIcon,
  StarIcon,
  PhotographIcon,
  ChatIcon,
  ShareIcon,
  HeartIcon,
  RefreshIcon,
} from '@heroicons/react/outline';

const navigation = [
  { text: '', icon: SunIcon, href: '/home' },
  { text: 'Home', icon: HomeIcon, href: '/home' },
  { text: 'Explore', icon: HashtagIcon, href: '/explore' },
  { text: 'Notifications', icon: BellIcon, href: '/notifications' },
  { text: 'Messages', icon: MailIcon, href: '/messages' },
  { text: 'Bookmarks', icon: BookmarkIcon, href: '/bookmarks' },
  { text: 'Lists', icon: ViewListIcon, href: '/lists' },
  { text: 'Profile', icon: UserIcon, href: '/profile' },
  { text: 'Settings', icon: DotsCircleHorizontalIcon, href: '/settings' },
];

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const route = useRoute();

  function logout(e: React.FormEvent) {
    e.preventDefault();
    Inertia.post(route('logout'));
  }

  return (
    <div className={'bg-black h-screen overflow-scroll flex items-stretch'}>
      <div className={'border-r border-gray-50 px-24 pr-24'}>
        <ul>
          {navigation.map(route => (
            <li key={route.href}>
              <InertiaLink
                href={route.href}
                className={
                  'text-white text-xl font-semibold inline-flex items-center space-x-4 p-4 rounded-full hover:bg-white hover:bg-opacity-10'
                }
              >
                {React.createElement(route.icon, { className: 'w-6 h-6' })}
                {route.text && <span>{route.text}</span>}
              </InertiaLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={'w-[40%] text-white'}>
        <div
          className={
            'flex items-center justify-between p-4 border-b border-gray-50'
          }
        >
          <h2 className={'text-xl font-semibold'}>Home</h2>
          <StarIcon className={'w-6 h-6'} />
        </div>

        <div className={'flex p-4 border-b border-gray-50'}>
          <div className={'pr-4'}>
            <img
              src="https://via.placeholder.com/100"
              alt=""
              className={'rounded-full w-12 h-12'}
            />
          </div>
          <div className={'flex-1'}>
            <textarea
              className={'w-full bg-transparent resize-none border-0 rounded'}
              placeholder={"What's happening?"}
            />
            <div className={'flex items-center justify-between'}>
              <div className="flex items-center space-x-2 text-blue-400">
                <button className={'border-0 bg-none'}>
                  <PhotographIcon className={'w-6 h-6'} />
                </button>
                <button className={'border-0 bg-none'}>
                  <PhotographIcon className={'w-6 h-6'} />
                </button>
                <button className={'border-0 bg-none'}>
                  <PhotographIcon className={'w-6 h-6'} />
                </button>
                <button className={'border-0 bg-none'}>
                  <PhotographIcon className={'w-6 h-6'} />
                </button>
              </div>
              <button
                className={
                  'rounded-full px-6 py-2 bg-blue-400 border-0 font-bold'
                }
              >
                Tweet
              </button>
            </div>
          </div>
        </div>

        <div className={'flex p-4'}>
          <div className={'pr-4'}>
            <img
              src="https://via.placeholder.com/100"
              alt=""
              className={'block rounded-full w-12 h-12'}
            />
          </div>
          <div className={'flex-1'}>
            <div className={'flex items-center space-x-1'}>
              <span className={'font-bold'}>Ozzie Neher</span>
              <span className={'text-gray-400'}>@ozzieneher</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, ad
              harum officiis, magni esse tempora quaerat, ipsam consequuntur
              numquam amet quidem mollitia! Quia aut cumque a tempore veniam
              nulla quis?
            </p>
            <div
              className={
                'mt-2 flex items-center justify-between text-gray-400 w-3/4 text-sm'
              }
            >
              <button
                className={'flex items-center space-x-4 hover:text-blue-400'}
              >
                <ChatIcon className={'w-4 h-4'} />
                <span>27</span>
              </button>
              <button
                className={'flex items-center space-x-4 hover:text-red-400'}
              >
                <HeartIcon className={'w-4 h-4'} />
                <span>100</span>
              </button>
              <button
                className={'flex items-center space-x-4 hover:text-green-400'}
              >
                <RefreshIcon className={'w-4 h-4'} />
                <span>100</span>
              </button>
              <button
                className={'flex items-center space-x-4 hover:text-blue-400'}
              >
                <ShareIcon className={'w-4 h-4'} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={'flex-1 border-l border-gray-50'}></div>
    </div>
  );
}
