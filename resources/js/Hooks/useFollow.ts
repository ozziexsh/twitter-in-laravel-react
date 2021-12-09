import { useEffect, useState } from 'react';
import useAxios from '@/Hooks/useAxios';
import useRoute from '@/Hooks/useRoute';
import { User } from '@/types';

interface Props {
  user: User;
  initialFollowersCount?: number;
  initialIsFollowing?: boolean;
}

export default function useFollow({
  user,
  initialFollowersCount = 0,
  initialIsFollowing = false,
}: Props) {
  const route = useRoute();
  const axios = useAxios();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  useEffect(() => {
    setFollowersCount(initialFollowersCount);
  }, [initialFollowersCount]);

  async function follow() {
    await axios.post(route('users.followers.store', [user]));
    setIsFollowing(true);
    setFollowersCount(f => f + 1);
  }

  async function unfollow() {
    await axios.delete(route('users.followers.destroy', [user]));
    setIsFollowing(false);
    setFollowersCount(f => f - 1);
  }

  return { follow, unfollow, followersCount, isFollowing };
}
