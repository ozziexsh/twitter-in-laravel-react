import { AxiosInstance } from 'axios';

export default function useAxios() {
  return (window as any).axios as AxiosInstance;
}
