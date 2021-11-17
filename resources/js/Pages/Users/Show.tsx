import React from 'react';
import { FeedTweet, User } from '@/types';
import TweetCard from '@/Components/TweetCard';
import UserProfileLayout from '@/Layouts/UserProfileLayout';
import useRoute from '@/Hooks/useRoute';
import useScrollingFeed from '@/Hooks/useScrollingFeed';

interface Props {
  profile: User;
}

export default function UsersShow({ profile }: Props) {
  const route = useRoute();
  const { items, loading } = useScrollingFeed<FeedTweet>({
    feedUrl: route('api.users.tweets.index', [profile]),
  });

  return (
    <div className={'divide-y divide-divider'}>
      {items.map(tweet => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
      {loading && <p className={'p-6'}>Loading...</p>}
    </div>
  );
}

UsersShow.layout = (page: any) => {
  return <UserProfileLayout {...page.props} children={page} />;
};
