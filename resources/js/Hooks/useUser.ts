import useTypedPage from '@/Hooks/useTypedPage';

export default function useUser() {
  const {
    props: { user },
  } = useTypedPage();
  return user;
}
