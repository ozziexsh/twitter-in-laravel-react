import useAxios from '@/Hooks/useAxios';
import { User } from '@/types';
import useSWR from 'swr';

export default function useUserSummary(username?: string | null) {
  const axios = useAxios();
  return useSWR<{
    user: User;
    following_count: number;
    followers_count: number;
    is_following: boolean;
  }>(username ? ['api', 'users', username, 'summary'] : null, (...path) =>
    axios.get(path.join('/')).then(res => res.data),
  );
}
