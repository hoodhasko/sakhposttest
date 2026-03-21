import { request } from './client';
import { HeroBanner } from '../types/hero';

const HERO_BANNERS_ENDPOINT = '/api/customer/ads/hero-banners';

const heroMock: HeroBanner[] = [
  {
    id: 'hero-1',
    title: 'Hot deals nearby',
    subtitle: 'Up to 40% off for selected restaurants',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1280&q=80',
    badge: 'Limited',
  },
  {
    id: 'hero-2',
    title: 'Lunch in 20 minutes',
    subtitle: 'Fast delivery from top rated places',
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1280&q=80',
    badge: 'Fast',
  },
  {
    id: 'hero-3',
    title: 'Free delivery day',
    subtitle: 'No delivery fee for partner restaurants',
    imageUrl:
      'https://images.unsplash.com/photo-1521833323361-7fe2f9f9f22c?auto=format&fit=crop&w=1280&q=80',
    badge: 'Today',
  },
];

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object';
};

const asString = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return fallback;
};

const pickArrayPayload = (payload: unknown): unknown[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!isRecord(payload)) {
    return [];
  }

  const direct = payload.data ?? payload.items ?? payload.results;
  if (Array.isArray(direct)) {
    return direct;
  }

  if (isRecord(payload.data) && Array.isArray(payload.data.items)) {
    return payload.data.items;
  }

  return [];
};

const normalizeHeroBanner = (
  item: unknown,
  index: number,
): HeroBanner | null => {
  if (!isRecord(item)) {
    return null;
  }

  const imageUrl = asString(
    item.imageUrl ??
      item.image ??
      item.bannerImageUrl ??
      item.photo ??
      item.url,
  );

  if (!imageUrl) {
    return null;
  }

  const title = asString(item.title ?? item.name, `Promo ${index + 1}`);
  const subtitle = asString(item.subtitle ?? item.description);
  const badge = asString(item.badge ?? item.label);

  return {
    id: asString(item.id ?? item.uuid, `hero-${index}`),
    title,
    subtitle,
    imageUrl,
    badge: badge || undefined,
  };
};

export const fetchHeroBanners = async (): Promise<HeroBanner[]> => {
  try {
    const payload = await request<unknown>(HERO_BANNERS_ENDPOINT);
    const normalized = pickArrayPayload(payload)
      .map((item, index) => normalizeHeroBanner(item, index))
      .filter((item): item is HeroBanner => Boolean(item));

    return normalized.length > 0 ? normalized : heroMock;
  } catch {
    return heroMock;
  }
};
