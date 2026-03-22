import {useQuery} from '@tanstack/react-query';
import {fetchHeroBanners} from '../../../api/hero';
import {HeroBannersResponse} from '../../../types/hero';

export const heroBannersQueryKey = ['hero-banners'];

export const useHeroBanners = () => {
  return useQuery<HeroBannersResponse>({
    queryKey: heroBannersQueryKey,
    queryFn: fetchHeroBanners,
  });
};
