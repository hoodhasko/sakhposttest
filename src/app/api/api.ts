import {API_BASE_URL} from '@config/constants';

const REQUEST_TIMEOUT_MS = 10000;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiErrorPayload {
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  status: number;
  code: 'HTTP_ERROR' | 'NETWORK_ERROR' | 'TIMEOUT_ERROR' | 'UNKNOWN_ERROR';
  details?: unknown;

  constructor(
    code: ApiError['code'],
    status: number,
    message: string,
    details?: unknown,
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const toUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const parseJsonSafely = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const normalizeApiError = (
  error: unknown,
  status = 0,
  payload?: unknown,
): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  const isAbortError =
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as {name?: string}).name === 'AbortError';

  if (isAbortError) {
    return new ApiError('TIMEOUT_ERROR', status, 'Request timed out', payload);
  }

  if (error instanceof TypeError) {
    return new ApiError(
      'NETWORK_ERROR',
      status,
      'Network request failed',
      payload,
    );
  }

  if (error instanceof Error) {
    return new ApiError('UNKNOWN_ERROR', status, error.message, payload);
  }

  return new ApiError('UNKNOWN_ERROR', status, 'Unexpected error', payload);
};

const request = async <T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  init?: Omit<RequestInit, 'method' | 'body'>,
): Promise<T> => {
  const url = toUrl(path);
  const controller = new AbortController();
  const startedAt = Date.now();
  const timer = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...init,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      method,
      signal: controller.signal,
    });

    const elapsedMs = Date.now() - startedAt;
    console.log(
      `[api] ${method} ${path} -> ${response.status} (${elapsedMs}ms)`,
    );

    if (!response.ok) {
      const payload = (await parseJsonSafely(
        response,
      )) as ApiErrorPayload | null;
      throw new ApiError(
        'HTTP_ERROR',
        response.status,
        payload?.message ?? payload?.error ?? 'Request failed',
        payload,
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    const normalizedError = normalizeApiError(error);
    console.error(`[api] ${method} ${path} failed`, {
      code: normalizedError.code,
      message: normalizedError.message,
      status: normalizedError.status,
    });
    throw normalizedError;
  } finally {
    clearTimeout(timer);
  }
};

export const api = {
  delete: <T>(path: string, init?: Omit<RequestInit, 'method' | 'body'>) =>
    request<T>('DELETE', path, undefined, init),
  get: <T>(path: string, init?: Omit<RequestInit, 'method' | 'body'>) =>
    request<T>('GET', path, undefined, init),
  patch: <T, B = unknown>(
    path: string,
    body: B,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ) => request<T>('PATCH', path, body, init),
  post: <T, B = unknown>(
    path: string,
    body: B,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ) => request<T>('POST', path, body, init),
  put: <T, B = unknown>(
    path: string,
    body: B,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ) => request<T>('PUT', path, body, init),
};
