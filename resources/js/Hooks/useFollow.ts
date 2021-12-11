import { useEffect, useState } from 'react';
import useAxios from '@/Hooks/useAxios';
import useRoute from '@/Hooks/useRoute';

interface Props {
  username: string;
  initialFollowersCount?: number;
  initialIsFollowing?: boolean;
}

export default function useFollow({
  username,
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
    await axios.post(route('users.followers.store', [username]));
    setIsFollowing(true);
    setFollowersCount(f => f + 1);
  }

  async function unfollow() {
    await axios.delete(route('users.followers.destroy', [username]));
    setIsFollowing(false);
    setFollowersCount(f => f - 1);
  }

  return { follow, unfollow, followersCount, isFollowing };
}
