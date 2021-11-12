import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import React, { PropsWithChildren } from 'react';
import useRoute from '@/Hooks/useRoute';
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

export default function AppLayout({ children }: PropsWithChildren<Props>) {
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
      <div className={'w-[40%] text-white'}>{children}</div>
      <div className={'flex-1 border-l border-gray-50'}></div>
    </div>
  );
}
