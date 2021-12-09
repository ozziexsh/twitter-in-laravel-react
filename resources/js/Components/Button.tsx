import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Color = 'brand' | 'white';

type Appearance = 'filled' | 'outlined';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: Color;
  appearance?: Appearance;
}

export default function Button({
  children,
  color = 'brand',
  appearance = 'filled',
  ...props
}: PropsWithChildren<Props>) {
  const baseClasses = 'rounded-full px-4 py-2 font-bold transition';

  const comboStyles: {
    [appearance in Appearance]: {
      [color in Color]: string;
    };
  } = {
    filled: {
      brand: 'bg-brand text-white',
      white: 'bg-white text-black',
    },
    outlined: {
      brand: 'bg-transparent border border-brand text-brand',
      white:
        'bg-transparent border border-white text-white hover:bg-white hover:text-black transition',
    },
  };

  return (
    <button
      {...props}
      className={classNames(
        baseClasses,
        comboStyles[appearance][color],
        props.className,
      )}
    >
      {children}
    </button>
  );
}
