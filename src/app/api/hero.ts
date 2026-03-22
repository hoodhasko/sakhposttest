import {api} from './api';
import {HeroBannersResponse} from '@models/index';

const HERO_BANNERS_ENDPOINT = '/customer/ads/hero-banners';

export const fetchHeroBanners = async (): Promise<HeroBannersResponse> => {
  return api.get<HeroBannersResponse>(HERO_BANNERS_ENDPOINT);
};
