import React, { useState } from 'react';
import { PhotographIcon } from '@heroicons/react/outline';
import useAxios from '@/Hooks/useAxios';
import { Tweet } from '@/types';

interface Props {
  onCreate(tweet: Tweet): void;
}

export default function TweetForm({ onCreate }: Props) {
  const [body, setBody] = useState('');
  const axios = useAxios();

  function onChange(e: React.FormEvent<HTMLTextAreaElement>) {
    if (body.length >= 280) {
      return;
    }
    setBody(e.currentTarget.value);
  }

  async function create() {
    const res = await axios.post('/tweets', { body });
    setBody('');
    onCreate(res.data.tweet);
  }

  return (
    <div className={'flex p-4'}>
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
          value={body}
          onChange={onChange}
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
          <div className={'flex items-center space-x-2'}>
            {body && <span>{body.length} / 240</span>}
            <button
              className={
                'rounded-full px-6 py-2 bg-blue-400 border-0 font-bold'
              }
              onClick={create}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
