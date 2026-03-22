import {api} from './api';
import {HeroBannersResponse} from '../../types/hero';

const HERO_BANNERS_ENDPOINT = '/api/customer/ads/hero-banners';

export const fetchHeroBanners = async (): Promise<HeroBannersResponse> => {
  return api.get<HeroBannersResponse>(HERO_BANNERS_ENDPOINT);
};
