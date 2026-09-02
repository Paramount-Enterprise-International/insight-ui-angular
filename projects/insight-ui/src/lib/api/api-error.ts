/** JSON-safe values accepted from backend error extension fields. */
export type ApiErrorExtensionValue =
  | string
  | number
  | boolean
  | null
  | ApiErrorExtensionValue[]
  | { [key: string]: ApiErrorExtensionValue };

/**
 * Normalized API error shared by all @insight/ui consumers.
 *
 * Known fields model the current backend contract and legacy Problem Details
 * fields. The index signature keeps safe, JSON-compatible backend extensions
 * (for example `traceId` or validation metadata) without weakening them to
 * `any`.
 */
export type INormalizedApiError = {
  [key: string]: unknown;
  status?: number;
  errorCode?: string;
  code?: string;
  message?: string;
  revision?: number;
  detail?: string;
  title?: string;
  retryAfter?: number;
};

/** Optional synchronous lookup used between backend and legacy/local messages. */
export type ApiErrorCatalogResolver = (
  errorCode: string,
  revision: number | undefined,
  error: INormalizedApiError,
) => string | null | undefined;

const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readString = (value: Record<string, unknown>, key: string): string | undefined => {
  const candidate = value[key];
  return typeof candidate === 'string' && candidate.trim().length > 0 ? candidate : undefined;
};

const readNumber = (value: Record<string, unknown>, key: string): number | undefined => {
  const candidate = value[key];
  return typeof candidate === 'number' && Number.isFinite(candidate) ? candidate : undefined;
};

const toSafeExtensionValue = (
  value: unknown,
  ancestors: ReadonlySet<object> = new Set<object>(),
): ApiErrorExtensionValue | undefined => {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value !== 'object' || ancestors.has(value)) {
    return undefined;
  }

  const nextAncestors = new Set(ancestors).add(value);
  if (Array.isArray(value)) {
    const result: ApiErrorExtensionValue[] = [];
    for (const item of value) {
      const safeItem = toSafeExtensionValue(item, nextAncestors);
      if (safeItem !== undefined) {
        result.push(safeItem);
      }
    }
    return result;
  }

  const result: { [key: string]: ApiErrorExtensionValue } = {};
  for (const [key, item] of Object.entries(value)) {
    if (UNSAFE_KEYS.has(key)) {
      continue;
    }
    const safeItem = toSafeExtensionValue(item, nextAncestors);
    if (safeItem !== undefined) {
      result[key] = safeItem;
    }
  }
  return result;
};

const readRetryAfterHeader = (transport: Record<string, unknown>): number | undefined => {
  const headers = transport['headers'];
  if (!isRecord(headers) || typeof headers['get'] !== 'function') {
    return undefined;
  }
  const value = (headers['get'] as (name: string) => unknown)('Retry-After');
  if (typeof value !== 'string' || value.trim().length === 0) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

/**
 * Purely normalizes current error bodies, legacy Problem Details bodies, and
 * raw Angular `HttpErrorResponse`-like values into one strict shape.
 */
export const normalizeApiError = (error: unknown): INormalizedApiError => {
  const transport = isRecord(error) ? error : {};
  const nestedBody = isRecord(transport['error']) ? transport['error'] : undefined;
  const body = nestedBody ?? transport;
  const normalized: INormalizedApiError = {};

  for (const [key, value] of Object.entries(body)) {
    if (UNSAFE_KEYS.has(key)) {
      continue;
    }
    const safeValue = toSafeExtensionValue(value);
    if (safeValue !== undefined) {
      normalized[key] = safeValue;
    }
  }

  const status = readNumber(transport, 'status') ?? readNumber(body, 'status');
  const bodyMessage = readString(body, 'message');
  const retryAfter = readNumber(body, 'retryAfter') ?? readRetryAfterHeader(transport);

  if (status !== undefined) normalized.status = status;
  if (bodyMessage !== undefined) normalized.message = bodyMessage;
  if (retryAfter !== undefined) normalized.retryAfter = retryAfter;

  return normalized;
};

/**
 * Resolves display text in the approved order: backend `message`, optional
 * catalog lookup, legacy `detail`/`title`, then the caller's local fallback.
 */
export const resolveApiErrorDisplayMessage = (
  error: unknown,
  localFallback: string,
  catalogResolver?: ApiErrorCatalogResolver,
): string => {
  const normalized = normalizeApiError(error);
  const backendMessage = normalized.message;
  if (backendMessage) {
    return backendMessage;
  }

  if (catalogResolver && normalized.errorCode) {
    try {
      const catalogMessage = catalogResolver(normalized.errorCode, normalized.revision, normalized);
      if (catalogMessage?.trim()) {
        return catalogMessage;
      }
    } catch {
      // A consumer catalog is optional; lookup failures fall through safely.
    }
  }

  return normalized.detail ?? normalized.title ?? localFallback;
};