import {useQuery} from '@tanstack/react-query';
import {fetchVendorsFilters} from '@app/api';
import {
  ListVendorsFiltersItem,
  ListVendorsFiltersResponse,
} from '@models/index';

export const vendorsFiltersQueryKey = ['vendors-filters'];

export const useVendorsFilters = () => {
  return useQuery<ListVendorsFiltersResponse, Error, ListVendorsFiltersItem[]>({
    queryKey: vendorsFiltersQueryKey,
    queryFn: fetchVendorsFilters,
    select: payload => payload.data,
  });
};
