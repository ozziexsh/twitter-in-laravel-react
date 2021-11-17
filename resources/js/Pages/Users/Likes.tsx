import React from 'react';
import UserProfileLayout from '@/Layouts/UserProfileLayout';
import useScrollingFeed from '@/Hooks/useScrollingFeed';
import useRoute from '@/Hooks/useRoute';
import { FeedTweet, User } from '@/types';
import TweetCard from '@/Components/TweetCard';

interface Props {
  profile: User;
}

export default function UsersLikes({ profile }: Props) {
  const route = useRoute();
  const { items, loading } = useScrollingFeed<FeedTweet>({
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
