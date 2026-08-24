import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as defaultEnvironment } from '../../environments/environment';
import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { IApiService } from '../api/api.service';

import type { IInsightCurrentUser } from './user.types';

/**
 * Current-user profile service — calls iam-user-api's `GET {api.user}/users/user`
 * endpoint (`CurrentUserDto`). The sidebar-shaped mapping (`IUser`) lives in
 * `user.mapper.ts` (`mapToSidebarUser`).
 *
 * Base URL: `{api.user}` from the resolved auth config (defaults to the
 * library environment file). Output type overridable via the generic — the
 * library default is the raw `IInsightCurrentUser` DTO.
 */
@Injectable({ providedIn: 'root' })
export class ICurrentUserService {
  private readonly api = inject(IApiService);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);

  private get baseUrl(): string {
    return this.config.api['user'] ?? defaultEnvironment.api.user;
  }

  /** GET `{api.user}/users/user` — raw current-user DTO. Override `T` to use your own response type. */
  getCurrentUser<T = IInsightCurrentUser>(): Observable<T> {
    return this.api.get<T>('/users/user', undefined, { apiUrl: this.baseUrl });
  }
}
