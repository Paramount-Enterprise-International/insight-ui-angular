import { inject, Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';

import { environment as defaultEnvironment } from '../../environments/environment';
import { I_AUTH_CONFIG } from '../auth/auth-config';
import { IApiService } from '../api/api.service';

import type {
  IEffectiveAuthorizationDto,
  IFavoriteMenuItemDto,
  IFavoriteOrderItemDto,
  IMenuNodeDto,
  IUserMenuEnvelopeDto,
} from './user.types';

/**
 * Current-user navigation & favorites service — calls iam-user-api's
 * application-scoped `/me/applications/:applicationId/*` endpoints. These endpoints return
 * a `{ meta, data }` envelope; this service unwraps `.data` so callers keep
 * the app-wide body-as-data convention.
 *
 * Base URL: `{api.user}` from the resolved auth config (defaults to the
 * library environment file). Consumer apps override via
 * `provideIAuth({ api: { user: '...' } })`.
 */
@Injectable({ providedIn: 'root' })
export class IUserMenuService {
  private readonly api = inject(IApiService);
  private readonly config = inject(I_AUTH_CONFIG);

  private get baseUrl(): string {
    return this.config.api['user'] ?? defaultEnvironment.api.user;
  }

  private resolveApplicationId(applicationId?: string): string | null {
    const id = applicationId ?? this.config.appId;
    return id?.trim() || null;
  }

  private applicationPath(applicationId: string, suffix: string): string {
    return `/me/applications/${encodeURIComponent(applicationId)}/${suffix}`;
  }

  private missingApplicationId<T>(): Observable<T> {
    return throwError(
      () =>
        new Error(
          '[@insight/ui] applicationId is required to load current-user application data.',
        ),
    );
  }

  /** GET `{api.user}/me/applications/:applicationId/menus` - effective navigation tree. */
  getEffectiveMenus<T = IMenuNodeDto[]>(applicationId?: string): Observable<T> {
    const id = this.resolveApplicationId(applicationId);
    if (!id) return this.missingApplicationId<T>();
    return this.api
      .get<IUserMenuEnvelopeDto<T>>(this.applicationPath(id, 'menus'), undefined, {
        apiUrl: this.baseUrl,
      })
      .pipe(map((response) => response.data));
  }

  /** GET `{api.user}/me/applications/:applicationId/menus/favorites` - effective favorites. */
  getFavorites<T = IFavoriteMenuItemDto[]>(applicationId?: string): Observable<T> {
    const id = this.resolveApplicationId(applicationId);
    if (!id) return this.missingApplicationId<T>();
    return this.api
      .get<IUserMenuEnvelopeDto<T>>(this.applicationPath(id, 'menus/favorites'), undefined, {
        apiUrl: this.baseUrl,
      })
      .pipe(map((response) => response.data));
  }

  /**
   * GET `{api.user}/me/applications/:applicationId/authorizations` - the complete set of
   * effective authorizations (menu items + functions) for the current user,
   * already reduced to `allowed` entries by the backend. Output type overridable
   * via `T`.
   *
   * The backend REQUIRES `applicationId`, so it falls back to `config.appId`
   * and fails loudly when neither is configured (fail-closed: the caller's
   * permission list simply stays empty).
   */
  getAuthorizations<T = IEffectiveAuthorizationDto[]>(applicationId?: string): Observable<T> {
    const id = this.resolveApplicationId(applicationId);
    if (!id) return this.missingApplicationId<T>();

    return this.api
      .get<IUserMenuEnvelopeDto<T>>(this.applicationPath(id, 'authorizations'), undefined, {
        apiUrl: this.baseUrl,
      })
      .pipe(map((response) => response.data));
  }

  /** PUT `{api.user}/me/menus/{menuId}/favorite` — pin an effective menu item (204 No Content). */
  addFavorite(menuId: string | number): Observable<void> {
    return this.api.put<void>(`/me/menus/${menuId}/favorite`, {}, { apiUrl: this.baseUrl });
  }

  /** DELETE `{api.user}/me/menus/{menuId}/favorite` — unpin a menu item (204 No Content). */
  removeFavorite(menuId: string | number): Observable<void> {
    return this.api.delete<void>(`/me/menus/${menuId}/favorite`, { apiUrl: this.baseUrl });
  }

  /**
   * PUT `{api.user}/me/menus/favorites` — atomically replace the complete
   * favorite collection after a drag-drop. `displayOrder` values form the
   * complete sequence 1..n. Returns 204 No Content.
   */
  reorderFavorites(menuIds: (string | number)[]): Observable<void> {
    const items: IFavoriteOrderItemDto[] = menuIds.map((menuId, index) => ({
      menuId: String(menuId),
      displayOrder: index + 1,
    }));
    return this.api.put<void>('/me/menus/favorites', { items }, { apiUrl: this.baseUrl });
  }
}
