import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment as defaultEnvironment } from '../../environments/environment';
import { I_AUTH_CONFIG } from '../auth/auth-config';
import { IApiService } from '../api/api.service';

import type {
  IFavoriteMenuItemDto,
  IFavoriteOrderItemDto,
  IMenuNodeDto,
  IUserMenuEnvelopeDto,
} from './user.types';

/**
 * Current-user navigation & favorites service — calls iam-user-api's
 * `/me/menus*` endpoints (user-menu service contract). These endpoints return
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

  /** GET `{api.user}/me/menus` — effective navigation tree for one or all active applications. Output type overridable via `T`. */
  getEffectiveMenus<T = IMenuNodeDto[]>(applicationId?: string): Observable<T> {
    const id = applicationId ?? this.config.appId;
    const params = id ? new HttpParams({ fromObject: { applicationId: id } }) : undefined;
    return this.api
      .get<IUserMenuEnvelopeDto<T>>('/me/menus', params, { apiUrl: this.baseUrl })
      .pipe(map((response) => response.data));
  }

  /** GET `{api.user}/me/menus/favorites` — effective favorite items, sorted by name. Output type overridable via `T`. */
  getFavorites<T = IFavoriteMenuItemDto[]>(applicationId?: string): Observable<T> {
    const id = applicationId ?? this.config.appId;
    const params = id ? new HttpParams({ fromObject: { applicationId: id } }) : undefined;
    return this.api
      .get<IUserMenuEnvelopeDto<T>>('/me/menus/favorites', params, { apiUrl: this.baseUrl })
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
