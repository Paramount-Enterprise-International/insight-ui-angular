# InsightUiAngular

## Routes protected by authorization codes

```ts
import { hasMn } from '@insight/ui';

hasMn('app.reports', {
  path: 'reports/:id',
  data: { title: 'Report' },
  loadComponent: () => import('./report').then((m) => m.Report),
})
```

The helper provides its own outlet boundary and Unauthorized Access fallback.
It uses the same code shorthand, ANY array input, and predicate evaluator as
`iHasMn`, waits for session/authorization readiness, and loads cold authorizations. Denial preserves
the URL and shell; title/breadcrumb overrides are restored on grant or navigation.
Route params, query, resolvers, providers, component layouts, and children remain
available through empty-path outlet boundaries. Relative sibling navigation
continues to use the consumer's mount path.

A check on a parent layout protects its subtree. Wrap individual page routes when
children have independent grants. Routes without `hasMn` have no authorization-code check;
unknown routes use the consumer's wildcard. `iHasMn`/`iNotHasMn` retain hide-only
behavior for ordinary templates.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Authorization codes and navigation

`GET {api.user}/me/applications/:applicationId/authorizations` is the only source
of access codes for `hasMn`, UI gates, hooks, and code-based guards. The service
unwraps `data`; the store retains `authorizations` and derives the unique
`menuCodes` from both `item` and `function` entries. `/menus` remains the source
of the navigation tree, sidebar, routes, icons, and favorite flags.

The predicate source contains `menuCodes`, `roles`, `companies`, `companyCodes`,
and `menuCompanies`. Companies are unique by id; company codes are unique;
`menuCompanies[code]` contains the companies granted specifically for that code.
For company-scoped access, check that mapping instead of the global company union.

`store.hasMenuCode(code)` checks authorizations with ANY-match for arrays.
`store.hasNavigableMenu(code)` checks navigation leaf codes from `/menus`.
`store.hasRoute(path)` checks routes from the same navigation tree.
`store.loadAuthorizations(applicationId?)` clears stale authorization data,
fetches new entries, and returns the authorization DTO array. The application id
falls back to the configured `appId`; absent ids fail before sending the request.

During a full store load, both positive and inverse UI gates stay hidden and
the React hook returns false. Once loading settles, inverse gates render when
the check is false. An authorization failure empties access codes and company
scope, records `loadErrors.authorizations`, and leaves other load branches
independent. Role predicates still read token roles. There is no fallback to
navigation codes. Route helpers retain their existing loading and in-place 403
behavior, and only activate guarded content after access is granted.

Code-based `requireAccess` / `IRequireAccess` use `source: 'menuCode'` or `'role'`;
React defaults to `'menuCode'`. Code guards wait for the cold-start store load.
Backend endpoints and enforcement remain unchanged.

### Breaking migration

| Previous API | Replacement |
| --- | --- |
| `source.menu`, `source.permission` | `source.menuCodes` from authorizations |
| `store.permissions`, Angular `permissions$` | `store.menuCodes`, Angular `menuCodes$` |
| `hasPermission()` | `hasMenuCode()` |
| `hasMenu()` | `hasMenuCode()` for access; `hasNavigableMenu()` for navigation |
| `loadPermissions()` | `loadAuthorizations()` returning authorization DTOs |
| `loadErrors.permissions`, load branch `permissions` | `loadErrors.authorizations`, branch `authorizations` |
| Guard source `'menu'` / `'permission'` | `'menuCode'` |
| `setPermissions()` | Removed; refresh backend authorizations |

No compatibility aliases or manual code override are provided.

Angular component imports `IAuthorizationSource` and defines a predicate for compound checks:

```ts
readonly canShowExample = (source: IAuthorizationSource): boolean =>
  source.menuCodes.includes('atlas.sales-administration.menu.451.hasmn-button-example') &&
  source.menuCompanies['atlas.sales-administration.menu.451.hasmn-button-example']?.includes('JKT') === true;
```

```html
<button *iHasMn="'atlas.sales-administration.menu.451.hasmn-button-example'">Example</button>
<button *iHasMn="canShowExample">Example for Jakarta</button>
```
## HTTP response contracts

`IApiService` remains an application-injected service. Existing component/service
usage, `provideIAuth(config)`, and interceptor registration remain supported.
No runtime factory or global API binding is introduced.

JSON bodies remain transparent; arrays and application envelopes are unchanged.
Empty responses retain Angular HttpClient's null result. GET keeps its positional
HttpParams argument. Other verbs accept `params` in options. DELETE payloads use
`options.body`, including false, zero and null.

```ts
const api = inject(IApiService);

api.get<Order[]>('/orders', new HttpParams().set('page', 1), {
  observe: 'response',
}).subscribe(response => {
  const total = response.headers.get('X-Total-Count');
  const orders = response.body;
});

api.post('/report', { id: 1 }, {
  observe: 'response',
  responseType: 'blob',
  params: { format: 'pdf' },
}).subscribe(response => {
  const contentType = response.headers.get('Content-Type');
  const disposition = response.headers.get('Content-Disposition');
  const file = response.body;
});

const form = new FormData();
form.append('file', selectedFile);
api.post('/upload', form).subscribe();

const controller = new AbortController();
api.get('/orders', undefined, {
  signal: controller.signal,
  timeoutMs: 60_000,
}).subscribe();
```

All methods support `observe: 'body' | 'response'` and
`responseType: 'json' | 'blob' | 'arraybuffer' | 'text'`.
Full responses use Angular HttpResponse, which exposes headers and decoded body.
Existing `getBlob()` and `upload()` helpers remain available; `patch()` supports
the same options. FormData passes unchanged and Content-Type is removed so the
browser computes its multipart boundary.

A subscription has a default 60000 ms deadline, covering initial request,
refresh waiting, retry and decoded response/error body. AbortSignal, deadline
and explicit unsubscribe stop the HttpClient transport subscription.
An already-aborted signal sends no request. Cancelling one caller does not cancel
the application's shared refresh for another caller. Cancellation/timeout errors
have status 0, names AbortError/TimeoutError and codes REQUEST_ABORTED/REQUEST_TIMEOUT.
They do not trigger the session-expiry flow.

A 401 triggers one refresh and one retry with the refreshed Authorization and
current CSRF token. Retry business errors propagate without clearing the session;
refresh failure or a retry still unauthorized uses the configured expiry flow.
Auth endpoints and `skipBearer: true` bypass session Bearer injection and refresh.
Error bodies returned as binary/text are decoded before normalization; non-JSON
payloads fall back safely without displaying HTML or transport messages.

### Backend error display

The canonical backend error contract remains `status` and `message`. Normalization
preserves these fields for callers; formatting changes display text only.

`resolveApiErrorDisplayMessage(error, fallback, catalogResolver?, formatter?)`
accepts an optional `IApiErrorDisplayFormatter`. Auth config's
`errorDisplayFormatter` applies it to library error displays.

Default behavior recognizes `message`/`Message` and field-validation dictionaries
in `errors`/`ModelState`. Multiple messages are retained, for example
`Name: Required, Too long; Code: Invalid`; the display removes `model.` prefixes.
Payload fields and metadata remain available on normalized errors.

Precedence is formatter, field validation, backend message, catalog lookup,
detail/title, then local fallback. An empty or failing callback uses the default.
Custom backend contracts can use the callback without a backend-specific adapter.

Business-backend token acceptance, audit username mapping, callback allowlists,
CORS/cookie configuration and cross-origin exposure of pagination/download
headers remain external integration requirements.
