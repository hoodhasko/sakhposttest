import { api } from './api';
import { Restaurant } from '../types/restaurant';

const RESTAURANT_ENDPOINTS = ['/restaurants', '/api/customer/restaurants'];

const mockRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Sushi Harbor',
    imageUrl:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1080&q=80',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryFee: '$1.99',
    cuisine: 'Sushi',
  },
  {
    id: 'rest-2',
    name: 'Fire Pizza',
    imageUrl:
      'https://images.unsplash.com/photo-1548365328-9f547fb0953f?auto=format&fit=crop&w=1080&q=80',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: '$0.99',
    cuisine: 'Pizza',
  },
  {
    id: 'rest-3',
    name: 'Urban Burger',
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1080&q=80',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: '$2.49',
    cuisine: 'Burgers',
  },
  {
    id: 'rest-4',
    name: 'Pasta Avenue',
    imageUrl:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1080&q=80',
    rating: 4.5,
    deliveryTime: '30-40 min',
    deliveryFee: '$1.49',
    cuisine: 'Italian',
  },
  {
    id: 'rest-5',
    name: 'Green Bowl',
    imageUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1080&q=80',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: '$0.00',
    cuisine: 'Healthy',
  },
  {
    id: 'rest-6',
    name: 'Noodle House',
    imageUrl:
      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=1080&q=80',
    rating: 4.4,
    deliveryTime: '25-35 min',
    deliveryFee: '$1.29',
    cuisine: 'Asian',
  },
  {
    id: 'rest-7',
    name: 'Taco Republic',
    imageUrl:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1080&q=80',
    rating: 4.7,
    deliveryTime: '18-28 min',
    deliveryFee: '$1.19',
    cuisine: 'Mexican',
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

const asNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
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

const normalizeRestaurant = (
  item: unknown,
  index: number,
): Restaurant | null => {
  if (!isRecord(item)) {
    return null;
  }

  const name = asString(item.name ?? item.title, `Restaurant ${index + 1}`);
  const imageUrl = asString(
    item.imageUrl ?? item.image ?? item.photo ?? item.logo,
  );

  if (!imageUrl) {
    return null;
  }

  const rating = asNumber(item.rating ?? item.rate, 4.5);

  return {
    id: asString(item.id ?? item.uuid, `rest-${index}`),
    name,
    imageUrl,
    rating,
    deliveryTime: asString(item.deliveryTime ?? item.eta, '20-35 min'),
    deliveryFee: asString(item.deliveryFee ?? item.fee, '$1.49'),
    cuisine: asString(item.cuisine ?? item.category, 'Popular'),
  };
};

const fetchRemoteRestaurants = async (): Promise<Restaurant[] | null> => {
  for (const endpoint of RESTAURANT_ENDPOINTS) {
    try {
      const payload = await api.get<unknown>(endpoint);
      const normalized = pickArrayPayload(payload)
        .map((item, index) => normalizeRestaurant(item, index))
        .filter((item): item is Restaurant => Boolean(item));

      if (normalized.length > 0) {
        return normalized;
      }
    } catch {
      continue;
    }
  }

  return null;
};

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const remote = await fetchRemoteRestaurants();

  if (remote) {
    return remote;
  }

  return mockRestaurants;
};
