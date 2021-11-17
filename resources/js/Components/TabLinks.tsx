import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

interface Props {
  links: Array<{
    href: string;
    label: string;
    active: boolean;
  }>;
}

export default function TabLinks({ links }: Props) {
  return (
    <div className={'flex border-b border-divider'}>
      {links.map(item => (
        <InertiaLink
          href={item.href}
          className={
            'inline-block text-center flex-grow hover:bg-white hover:bg-opacity-10 text-gray-400 font-bold h-14'
          }
          key={item.label}
          preserveScroll={true}
        >
          <div className={'relative inline-flex items-center h-full'}>
            <span>{item.label}</span>
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
  );
}
