import {api} from './api';
import {ListVendorsFiltersResponse} from '@models/index';

const VENDORS_FILTERS_ENDPOINT = '/vendors/filters';

export const fetchVendorsFilters =
  async (): Promise<ListVendorsFiltersResponse> => {
    return api.get<ListVendorsFiltersResponse>(VENDORS_FILTERS_ENDPOINT);
  };
