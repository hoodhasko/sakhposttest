import {api} from './api';
import {ListVendorsFiltersResponse} from '../types';

const VENDORS_FILTERS_ENDPOINT = '/api/vendors/filters';

export const fetchVendorsFilters =
  async (): Promise<ListVendorsFiltersResponse> => {
    return api.get<ListVendorsFiltersResponse>(VENDORS_FILTERS_ENDPOINT);
  };
