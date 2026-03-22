import {useQuery} from '@tanstack/react-query';
import {fetchVendorsFilters} from '../../../api';
import {
  ListVendorsFiltersItem,
  ListVendorsFiltersResponse,
} from '../../../types';

export const vendorsFiltersQueryKey = ['vendors-filters'];

export const useVendorsFilters = () => {
  return useQuery<ListVendorsFiltersResponse, Error, ListVendorsFiltersItem[]>({
    queryKey: vendorsFiltersQueryKey,
    queryFn: fetchVendorsFilters,
    select: payload => payload.data,
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 20,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};
