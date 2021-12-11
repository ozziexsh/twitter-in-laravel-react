import TweetAvatarHover from '@/Components/TweetAvatarHover';
import useRoute from '@/Hooks/useRoute';
import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

export default function TweetBody({ body }: { body: string }) {
  const route = useRoute();

  function formatMention(mention: string, idx: number) {
    const username = mention.slice(1);
    return (
      <TweetAvatarHover key={idx} username={username}>
        <InertiaLink
          href={route('users.show', [username])}
          onClick={e => e.stopPropagation()}
          className={'text-brand hover:underline'}
        >
          {mention}{' '}
        </InertiaLink>
      </TweetAvatarHover>
    );
  }

  function formatHashtag(hashtag: string, idx: number) {
    return (
      <InertiaLink
        href={`/hashtags/${hashtag.slice(1)}`}
        onClick={e => e.stopPropagation()}
        className={'text-brand hover:underline'}
        key={idx}
      >
        {hashtag}{' '}
      </InertiaLink>
    );
  }

  function parseWord(text: string, idx: number) {
    const matchesMention = text.match(/(@[a-zA-Z0-9]+)/g);
    if (matchesMention) {
      return formatMention(text, idx);
    }
    const matchesHashtag = text.match(/(#[a-zA-Z0-9]+)/g);
    if (matchesHashtag) {
      return formatHashtag(text, idx);
    }
    return <span key={idx}>{text} </span>;
  }

  return (
    <>
      {body.split('\n').map((text, i) => (
        <p key={i}>{text.split(' ').map(parseWord)}</p>
      ))}
    </>
  );
}
