const API_BASE_URL = 'https://delivery-app-api.sakhdev.ru';

const REQUEST_TIMEOUT_MS = 10000;

interface ApiErrorPayload {
  message?: string;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const toUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const request = async <T>(
  path: string,
  init?: RequestInit,
): Promise<T> => {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(toUrl(path), {
      ...init,
      signal: controller.signal,
    });

    if (!response.ok) {
      let payload: ApiErrorPayload | null = null;

      try {
        payload = (await response.json()) as ApiErrorPayload;
      } catch {
        payload = null;
      }

      throw new ApiError(
        response.status,
        payload?.message ?? 'Network request failed',
      );
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
};
