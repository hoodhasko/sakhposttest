import { useQuery } from '@tanstack/react-query';
import { fetchRestaurants } from '../api/restaurants';
import { Restaurant } from '../types/restaurant';

export const restaurantsQueryKey = ['restaurants'];

export const useRestaurants = () => {
  return useQuery<Restaurant[]>({
    queryKey: restaurantsQueryKey,
    queryFn: fetchRestaurants,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 20,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};
