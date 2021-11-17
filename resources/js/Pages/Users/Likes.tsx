import React from 'react';
import UserProfileLayout from '@/Layouts/UserProfileLayout';
import useTweetFeed from '@/Hooks/useTweetFeed';
import useRoute from '@/Hooks/useRoute';
import { User } from '@/types';
import TweetCard from '@/Components/TweetCard';

interface Props {
  profile: User;
}

export default function UsersLikes({ profile }: Props) {
  const route = useRoute();
  const { items, loading } = useTweetFeed({
    feedUrl: route('api.users.likes.index', [profile]),
  });

  return (
    <div>
      <div className={'divide-y divide-divider'}>
        {items.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
        {loading && <p className={'p-6'}>Loading...</p>}
      </div>
    </div>
  );
}

UsersLikes.layout = (page: any) => {
  return <UserProfileLayout {...page.props} children={page} />;
};
