import {
  IApiErrorCatalogResolver,
  normalizeApiError,
  resolveApiErrorDisplayMessage,
} from './api-error';

describe('API error helpers', () => {
  it('normalizes the new contract and preserves revision plus safe extensions', () => {
    const normalized = normalizeApiError({
      error: {
        errorCode: 'AUTH_SESSION_REVOKED',
        message: 'Your access was revoked.',
        revision: 7,
        traceId: 'trace-123',
        validation: { field: 'sessionId', expected: ['active', null] },
        ignored: () => 'unsafe',
      },
      status: 401,
      message: 'Http failure response for /auth/refresh: 401 Unauthorized',
    });

    expect(normalized.errorCode).toBe('AUTH_SESSION_REVOKED');
    expect(normalized.message).toBe('Your access was revoked.');
    expect(normalized.revision).toBe(7);
    expect(normalized['traceId'] as unknown).toBe('trace-123');
    expect(normalized['validation'] as unknown).toEqual({
      field: 'sessionId',
      expected: ['active', null],
    });
    expect(normalized.status).toBe(401);
  });

  it('normalizes legacy detail/code and Retry-After header fields', () => {
    const normalized = normalizeApiError({
      error: { code: 'TOO_MANY_REQUESTS', detail: 'Please retry later.' },
      status: 429,
      headers: { get: (name: string): string | null => (name === 'Retry-After' ? '30' : null) },
    });

    expect(normalized.code).toBe('TOO_MANY_REQUESTS');
    expect(normalized.detail).toBe('Please retry later.');
    expect(normalized.retryAfter).toBe(30);
  });

  it('uses backend message before catalog, then legacy detail/title and local fallback', () => {
    const resolver: IApiErrorCatalogResolver = jasmine
      .createSpy('resolver')
      .and.returnValue('Catalog message');

    expect(
      resolveApiErrorDisplayMessage(
        { errorCode: 'AUTH_SESSION_REVOKED', message: 'Backend message', detail: 'Legacy detail' },
        'Local fallback',
        resolver,
      ),
    ).toBe('Backend message');
    expect(resolver).not.toHaveBeenCalled();

    expect(
      resolveApiErrorDisplayMessage(
        { errorCode: 'AUTH_SESSION_REVOKED', revision: 4 },
        'Local fallback',
        resolver,
      ),
    ).toBe('Catalog message');
    expect(resolver).toHaveBeenCalledWith('AUTH_SESSION_REVOKED', 4, jasmine.any(Object));

    expect(
      resolveApiErrorDisplayMessage(
        { detail: 'Legacy detail', title: 'Legacy title' },
        'Local fallback',
      ),
    ).toBe('Legacy detail');
    expect(resolveApiErrorDisplayMessage({ title: 'Legacy title' }, 'Local fallback')).toBe(
      'Legacy title',
    );
    expect(resolveApiErrorDisplayMessage({}, 'Local fallback')).toBe('Local fallback');
  });

  it('does not treat an Angular transport message as a backend message', () => {
    const resolver: IApiErrorCatalogResolver = jasmine
      .createSpy('resolver')
      .and.returnValue('Catalog message');
    const error = {
      error: { errorCode: 'AUTH_SESSION_REVOKED', detail: 'Legacy detail' },
      message: 'Http failure response for /auth/refresh: 401 Unauthorized',
      status: 401,
    };

    expect(resolveApiErrorDisplayMessage(error, 'Local fallback', resolver)).toBe(
      'Catalog message',
    );
  });
});describe('generic backend display formatting', () => {
  it('formats common messages and field validation without losing metadata', () => {
    const body = {
      Message: 'Validation failed',
      ModelState: { 'model.Name': ['Required', 'Too long'], 'model.Code': ['Invalid'] },
      traceId: 'trace',
    };
    expect(normalizeApiError({ error: body, status: 400 })).toEqual(
      jasmine.objectContaining({
        message: 'Validation failed',
        ModelState: body.ModelState,
        traceId: 'trace',
      }),
    );
    expect(resolveApiErrorDisplayMessage({ error: body }, 'Fallback')).toBe(
      'Name: Required, Too long; Code: Invalid',
    );
    expect(
      resolveApiErrorDisplayMessage(
        { errors: { Name: ['Required'], Empty: [], Invalid: 42 } },
        'Fallback',
      ),
    ).toBe('Name: Required');
    expect(resolveApiErrorDisplayMessage({ Message: 'Backend message' }, 'Fallback')).toBe(
      'Backend message',
    );
  });

  it('supports application formatting with safe default fallbacks', () => {
    const body = { message: 'Backend message', detail: 'Detail' };
    expect(resolveApiErrorDisplayMessage(body, 'Fallback', undefined, () => 'Custom message')).toBe(
      'Custom message',
    );
    expect(resolveApiErrorDisplayMessage(body, 'Fallback', undefined, () => ' ')).toBe(
      'Backend message',
    );
    expect(
      resolveApiErrorDisplayMessage(body, 'Fallback', undefined, () => {
        throw new Error('failed');
      }),
    ).toBe('Backend message');
    expect(resolveApiErrorDisplayMessage({ errors: { Name: [] } }, 'Fallback')).toBe('Fallback');
  });
});
describe('canonical backend errors', () => {
  it('preserves status and message while formatting only display text', () => {
    const backend = {
      status: 400,
      message: 'Canonical backend message',
      Message: 'Alternate message',
      errors: { Name: ['Required'] },
      traceId: 'trace',
    };
    const normalized = normalizeApiError({
      status: 400,
      error: backend,
      message: 'Transport message',
    });
    expect(normalized.status).toBe(400);
    expect(normalized.message).toBe('Canonical backend message');
    expect(normalized['traceId']).toBe('trace');
    expect(
      resolveApiErrorDisplayMessage(normalized, 'Fallback', undefined, () => 'Friendly display'),
    ).toBe('Friendly display');
    expect(normalized.status).toBe(400);
    expect(normalized.message).toBe('Canonical backend message');
    expect(backend.message).toBe('Canonical backend message');
  });
});
