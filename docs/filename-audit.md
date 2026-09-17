# Filename audit

Type suffixes are removed when the folder already identifies the role. Public exports are unchanged.

| Previous path | Current path |
|---|---|
| `projects/insight-ui/src/lib/api/api.service.spec.ts` | `projects/insight-ui/src/lib/api/api.spec.ts` |
| `projects/insight-ui/src/lib/api/api.service.ts` | `projects/insight-ui/src/lib/api/api.ts` |
| `projects/insight-ui/src/lib/auth/auth.service.ts` | `projects/insight-ui/src/lib/auth/auth.ts` |
| `projects/insight-ui/src/lib/csrf/csrf.service.spec.ts` | `projects/insight-ui/src/lib/csrf/csrf.spec.ts` |
| `projects/insight-ui/src/lib/csrf/csrf.service.ts` | `projects/insight-ui/src/lib/csrf/csrf.ts` |
| `projects/insight-ui/src/lib/directives/has-mn.directive.spec.ts` | `projects/insight-ui/src/lib/directives/has-mn.spec.ts` |
| `projects/insight-ui/src/lib/guards/access.guard.spec.ts` | `projects/insight-ui/src/lib/guards/access.spec.ts` |
| `projects/insight-ui/src/lib/guards/access.guard.ts` | `projects/insight-ui/src/lib/guards/access.ts` |
| `projects/insight-ui/src/lib/guards/auth.guard.ts` | `projects/insight-ui/src/lib/guards/auth.ts` |
| `projects/insight-ui/src/lib/guards/route-access.guard.spec.ts` | `projects/insight-ui/src/lib/guards/route-access.spec.ts` |
| `projects/insight-ui/src/lib/guards/route-access.guard.ts` | `projects/insight-ui/src/lib/guards/route-access.ts` |
| `projects/insight-ui/src/lib/interceptors/auth.interceptor.ts` | `projects/insight-ui/src/lib/interceptors/auth.ts` |
| `projects/insight-ui/src/lib/session/session.service.spec.ts` | `projects/insight-ui/src/lib/session/session.spec.ts` |
| `projects/insight-ui/src/lib/session/session.service.ts` | `projects/insight-ui/src/lib/session/session.ts` |
| `projects/insight-ui/src/lib/session-expired/session-expired.service.spec.ts` | `projects/insight-ui/src/lib/session-expired/session-expired.spec.ts` |
| `projects/insight-ui/src/lib/session-expired/session-expired.service.ts` | `projects/insight-ui/src/lib/session-expired/session-expired.ts` |
| `projects/insight-ui/src/lib/storage/storage.service.ts` | `projects/insight-ui/src/lib/storage/storage.ts` |
| `projects/insight-ui/src/lib/store/user-menu.store.spec.ts` | `projects/insight-ui/src/lib/store/user-menu.spec.ts` |
| `projects/insight-ui/src/lib/store/user-menu.store.ts` | `projects/insight-ui/src/lib/store/user-menu.ts` |
| `projects/insight-ui/src/lib/user/current-user.service.spec.ts` | `projects/insight-ui/src/lib/user/current-user.spec.ts` |
| `projects/insight-ui/src/lib/user/current-user.service.ts` | `projects/insight-ui/src/lib/user/current-user.ts` |
| `projects/insight-ui/src/lib/user/user-menu.service.spec.ts` | `projects/insight-ui/src/lib/user/user-menu.spec.ts` |
| `projects/insight-ui/src/lib/user/user-menu.service.ts` | `projects/insight-ui/src/lib/user/user-menu.ts` |

## Retained names

- `.types`, `.config`, `.mapper`, `.context`, `.spec`, and `.test` distinguish file responsibilities.
- Angular root files `highlight-search.pipe.ts` and `truncated-tooltip.directive.ts` retain suffixes because the root provides no type context.
- API client filenames retain `.client` to distinguish the client role from error helpers.
- Feature, component, provider, and dialog names remain descriptive; no public symbols or selectors were renamed.
