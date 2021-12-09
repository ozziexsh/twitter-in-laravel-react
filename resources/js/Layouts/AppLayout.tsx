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
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
  onMainContentScroll?: React.UIEventHandler<HTMLDivElement>;
}

export default function AppLayout({
  children,
  onMainContentScroll,
}: PropsWithChildren<Props>) {
  const route = useRoute();
  const page = useTypedPage();

  const navigation = [
    { text: '', icon: SunIcon, href: '/home' },
    { text: 'Home', icon: HomeIcon, href: '/home' },
    { text: 'Explore', icon: HashtagIcon, href: '/explore' },
    { text: 'Notifications', icon: BellIcon, href: '/notifications' },
    { text: 'Messages', icon: MailIcon, href: '/messages' },
    { text: 'Bookmarks', icon: BookmarkIcon, href: '/bookmarks' },
    { text: 'Lists', icon: ViewListIcon, href: '/lists' },
    {
      text: 'Profile',
      icon: UserIcon,
      href: page.props.user
        ? route('users.show', [page.props.user])
        : route('login'),
    },
    { text: 'More', icon: DotsCircleHorizontalIcon, href: '/settings' },
  ];

  function logout(e: React.FormEvent) {
    e.preventDefault();
    Inertia.post(route('logout'));
  }

  return (
    <div className={'bg-black h-screen flex items-stretch'}>
      <div
        className={
          'border-r border-divider max-w-md lg:max-w-[26%] px-2 lg:pl-24 lg:pr-4'
        }
      >
        <ul>
          {navigation.map(route => (
            <li key={route.text}>
              <InertiaLink href={route.href} className={'block group lg:pr-8'}>
                <span
                  className={
                    'text-white text-xl font-semibold inline-flex items-center space-x-4 p-4 rounded-full group-hover:bg-white group-hover:bg-opacity-10'
                  }
                >
                  {React.createElement(route.icon, { className: 'w-6 h-6' })}
                  {route.text && (
                    <span className={'hidden lg:inline'}>{route.text}</span>
                  )}
                </span>
              </InertiaLink>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={
          'w-full md:max-w-[600px] text-white overflow-scroll md:border-r md:border-divider'
        }
        onScroll={onMainContentScroll}
        scroll-region=""
      >
        {children}
      </div>
      <div className={'hidden lg:flex lg:flex-1'}></div>
    </div>
  );
}
