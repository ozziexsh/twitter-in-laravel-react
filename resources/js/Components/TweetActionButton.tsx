import classNames from 'classnames';
import React from 'react';

export enum ButtonColor {
  green,
  brand,
  red,
}

interface TweetButtonProps {
  icon: React.ComponentType<{ className: string }>;
  label?: string | number;
  color: ButtonColor;
  onClick?(e: React.FormEvent<HTMLButtonElement>): void;
  active?: boolean;
  iconClassName?: string;
}

export default function TweetActionButton({
  icon,
  label,
  color,
  onClick,
  active,
  iconClassName,
}: TweetButtonProps) {
  const bgClass = {
    [ButtonColor.brand]: 'group-hover:bg-brand',
    [ButtonColor.green]: 'group-hover:bg-green-400',
    [ButtonColor.red]: 'group-hover:bg-red-400',
  };
  const textClass = {
    [ButtonColor.brand]: 'group-hover:text-brand',
    [ButtonColor.green]: 'group-hover:text-green-400',
    [ButtonColor.red]: 'group-hover:text-red-400',
  };
  const activeTextClass = {
    [ButtonColor.brand]: 'text-brand',
    [ButtonColor.green]: 'text-green-400',
    [ButtonColor.red]: 'text-red-400',
  };

  return (
    <button
      className={'flex items-center space-x-1 group transition-all'}
      onClick={onClick}
    >
      <span
        className={classNames(
          'p-2 rounded-full transition-all group-hover:bg-opacity-10',
          bgClass[color],
          textClass[color],
          {
            [activeTextClass[color]]: active,
          },
        )}
      >
        {React.createElement(icon, { className: iconClassName || 'w-4 h-4' })}
      </span>
      {label !== undefined && (
        <span
          className={classNames('transition-all', textClass[color], {
            [activeTextClass[color]]: active,
          })}
        >
          {label}
        </span>
      )}
    </button>
  );
}
