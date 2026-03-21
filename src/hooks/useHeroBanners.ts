import { useQuery } from '@tanstack/react-query';
import { fetchHeroBanners } from '../api/hero';
import { HeroBanner } from '../types/hero';

export const heroBannersQueryKey = ['hero-banners'];

export const useHeroBanners = () => {
  return useQuery<HeroBanner[]>({
    queryKey: heroBannersQueryKey,
    queryFn: fetchHeroBanners,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};
