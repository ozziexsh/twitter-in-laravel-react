import { useState } from 'react';
import useAxios from '@/Hooks/useAxios';
import useRoute from '@/Hooks/useRoute';
import { FeedTweet } from '@/types';

export default function useTweetLikes({ tweet }: { tweet: FeedTweet }) {
  const route = useRoute();
  const axios = useAxios();
  const [liked, setLiked] = useState(tweet.liked);
  const [likes, setLikes] = useState(tweet.likes_count);

  function onLikeClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (liked) {
      axios.delete(route('tweets.likes.destroy', [tweet]));
      setLiked(false);
      setLikes(l => l - 1);
    } else {
      axios.post(route('tweets.likes.store', [tweet]));
      setLiked(true);
      setLikes(l => l + 1);
    }
  }

  return { liked, likes, onLikeClick };
}
