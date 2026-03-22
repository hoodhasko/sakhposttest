import {useQuery} from '@tanstack/react-query';
import {fetchHeroBanners} from '@app/api';
import {HeroBannersResponse} from '@models/index';

export const heroBannersQueryKey = ['hero-banners'];

export const useHeroBanners = () => {
  return useQuery<HeroBannersResponse>({
    queryKey: heroBannersQueryKey,
    queryFn: fetchHeroBanners,
  });
};
