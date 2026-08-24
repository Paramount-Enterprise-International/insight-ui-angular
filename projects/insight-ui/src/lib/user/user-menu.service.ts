import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment as defaultEnvironment } from '../../environments/environment';
import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { IApiService } from '../api/api.service';

import type {
  IInsightFavoriteMenuItem,
  IInsightFavoriteOrderItem,
  IInsightMenuNode,
  IInsightUserMenuEnvelope,
} from './user.types';

/**
 * Current-user navigation & favorites service — calls iam-user-api's
 * `/me/menus*` endpoints (user-menu service contract). These endpoints return
 * a `{ meta, data }` envelope; this service unwraps `.data` so callers keep
 * the app-wide body-as-data convention.
 *
 * Base URL: `{api.user}` from the resolved auth config (defaults to the
 * library environment file). Consumer apps override via
 * `provideInsightAuth({ api: { user: '...' } })`.
 */
@Injectable({ providedIn: 'root' })
export class IUserMenuService {
  private readonly api = inject(IApiService);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);

  private get baseUrl(): string {
    return this.config.api['user'] ?? defaultEnvironment.api.user;
  }

  /** GET `{api.user}/me/menus` — effective navigation tree for one or all active applications. Output type overridable via `T`. */
  getEffectiveMenus<T = IInsightMenuNode[]>(applicationId?: string): Observable<T> {
    const params = applicationId ? new HttpParams({ fromObject: { applicationId } }) : undefined;
    return this.api
      .get<IInsightUserMenuEnvelope<T>>('/me/menus', params, { apiUrl: this.baseUrl })
      .pipe(map((response) => response.data));
  }

  /** GET `{api.user}/me/menus/favorites` — effective favorite items, sorted by name. Output type overridable via `T`. */
  getFavorites<T = IInsightFavoriteMenuItem[]>(applicationId?: string): Observable<T> {
    const params = applicationId ? new HttpParams({ fromObject: { applicationId } }) : undefined;
    return this.api
      .get<IInsightUserMenuEnvelope<T>>('/me/menus/favorites', params, { apiUrl: this.baseUrl })
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
    const items: IInsightFavoriteOrderItem[] = menuIds.map((menuId, index) => ({
      menuId: String(menuId),
      displayOrder: index + 1,
    }));
    return this.api.put<void>('/me/menus/favorites', { items }, { apiUrl: this.baseUrl });
  }
}
