# InsightUiAngular

## Datepicker formatting

`i-datepicker` and `i-fc-datepicker` use `format` for numeric date entry and
parsing. The supported input tokens are `dd`, `MM`, and `yyyy`; their order
and separators can vary, for example `yyyy-MM-dd`.

Set `displayFormat` to show a different format when the input is not focused
or is disabled. For example, `format="dd/MM/yyyy"` with
`displayFormat="dd MMM yyyy"` displays `14 Jul 2026` and switches to
`14/07/2026` for editing. `MMM` and `MMMM` display English month names.
When omitted, `displayFormat` uses `format`. Incomplete or invalid input
remains visible and emits `null`.

## Routes protected by authorization codes

```ts
import { hasMn } from '@insight/ui';

hasMn('app.reports', {
  path: 'reports/:id',
  data: { title: 'Report' },
  loadComponent: () => import('./report').then((m) => m.Report),
});
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

| Previous API                                        | Replacement                                                     |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `source.menu`, `source.permission`                  | `source.menuCodes` from authorizations                          |
| `store.permissions`, Angular `permissions$`         | `store.menuCodes`, Angular `menuCodes$`                         |
| `hasPermission()`                                   | `hasMenuCode()`                                                 |
| `hasMenu()`                                         | `hasMenuCode()` for access; `hasNavigableMenu()` for navigation |
| `loadPermissions()`                                 | `loadAuthorizations()` returning authorization DTOs             |
| `loadErrors.permissions`, load branch `permissions` | `loadErrors.authorizations`, branch `authorizations`            |
| Guard source `'menu'` / `'permission'`              | `'menuCode'`                                                    |
| `setPermissions()`                                  | Removed; refresh backend authorizations                         |

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

api
  .get<Order[]>('/orders', new HttpParams().set('page', 1), {
    observe: 'response',
  })
  .subscribe((response) => {
    const total = response.headers.get('X-Total-Count');
    const orders = response.body;
  });

api
  .post(
    '/report',
    { id: 1 },
    {
      observe: 'response',
      responseType: 'blob',
      params: { format: 'pdf' },
    },
  )
  .subscribe((response) => {
    const contentType = response.headers.get('Content-Type');
    const disposition = response.headers.get('Content-Disposition');
    const file = response.body;
  });

const form = new FormData();
form.append('file', selectedFile);
api.post('/upload', form).subscribe();

const controller = new AbortController();
api
  .get('/orders', undefined, {
    signal: controller.signal,
    timeoutMs: 60_000,
  })
  .subscribe();
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

## Controlled notifications

```html
<ih-content
  [notification]="notificationState"
  (onNotificationAction)="handleNotificationAction($event)"
/>
<!-- Outside IHContent, for example a profile header: -->
<i-notification [state]="notificationState" (onAction)="handleNotificationAction($event)" />
```

`notification` is optional. Omit it or pass `null` to hide the bell and clean up
its overlay. `{ unreadCount: 0 }` shows the bell without a badge. The header places
it after the title at the far right. Supply it only on the owning shell; remote
pages should not render a second notification instance.

`INotificationState` requires only `unreadCount`. Optional fields are `open`,
`items`, `loading`, `hasLoaded`, `loadingMore`, `readingId`, `hasMore`, `error`,
`loadMoreError`, `actionError`, and `snackbar`. Lists default to empty, flags to
false, and errors/snackbar to null. Set `hasLoaded` after the first successful
list response, including an empty response, to distinguish refresh from initial
loading. Replace state references when updating data.

`INotificationAction` is a discriminated union using `type`: `toggle`, `close`,
`open-all`, `open-item` (with `item`), `load-more`, `retry`, `retry-read`, and
`dismiss-snackbar`. The consumer updates controlled `open` state in response to
toggle/close. Opening a snackbar item emits `open-item` as well.

`INotificationEntry` retains notification/module ids, module name, title,
description, nullable link, `isDismissable`, group count, latest date, and optional
visual metadata. `INotificationSnackbarMessage` contains key/title, optional
module name and item. The separate bell, drawer, item, snackbar components and
presentation helpers are also exported.

Load the matching `insight-ui-css` stylesheet, which owns all notification layout
and visuals. The drawer provides modal focus, backdrop, Escape, scroll locking,
and focus restoration. Refresh keeps list entries mounted and interactive;
load-more requests occur at 80% scroll and are suppressed while busy or failed.
The library emits events only: API, session, SSE, routing, read operations, resolved
error messages, snackbar duration and deduplication remain consumer-owned.

Notification overlays reuse `IDialogContainer`, with body mounting, focus guards,
scroll locking and cleanup handled inside the library. They do not require Angular
CDK. Load matching Insight CSS for the right-aligned full-height dialog layout.

Toggling slides the drawer from the right over 240ms and fades its backdrop.
Closing retains the modal and scroll lock until the exit finishes; reopening
reverses the transition. Reduced-motion preferences disable animation. Removing
state or destroying the component cleans up immediately.

## Resizable sidebar

`IHSidebar` enables pointer and keyboard resizing by default. Load the matching
`insight-ui-css` stylesheet before mounting the sidebar; it owns the resize handle
and interaction styles. The initial width comes from `--i-sidebar-width` (260px
by default), unless a valid saved preference exists. Width overrides stay on the
sidebar instance and do not change the root CSS token.
The initial width is applied without animation, including after a tab refresh;
the visibility toggle retains its transition.

| Input/output      | Default                   | Contract                                                                        |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------- |
| `resizable`       | `true`                    | Enable the right-edge resize handle.                                            |
| `minWidth`        | `220`                     | Minimum width in pixels.                                                        |
| `maxWidth`        | `480`                     | Maximum width in pixels.                                                        |
| `widthStorageKey` | `'insight.sidebar.width'` | localStorage key; `null` disables persistence.                                  |
| `onWidthChange`   | Output                    | Emit the final width in pixels after a changed pointer or keyboard interaction. |

```html
<ih-sidebar
  [user$]="user$"
  [menusInput$]="menus$"
  [visible]="sidebarVisible"
  [minWidth]="220"
  [maxWidth]="480"
  widthStorageKey="my-app.sidebar.width"
  (onWidthChange)="onSidebarWidthChange($event)"
/>
```

Drag the right edge with a mouse, pen or touch. Width snaps to the initial CSS
default within 12px and moves freely outside that distance. Snapping applies
only when the default is inside the configured bounds. The bounds stay fixed
on narrow screens; the existing visibility toggle remains available.

Focus the separator and use Left/Right arrows for 10px steps, Shift+arrows for
50px steps, Home for minimum and End for maximum. Keyboard steps do not snap.
Escape, pointer cancellation, lost capture, window blur, hide, disable or destroy
cancel an active drag and restore its starting width without emitting or saving.
Hiding and showing the sidebar preserves a completed width change.

Preferences use a numeric string in localStorage, shared per browser origin
across Angular and React. Use a custom key to isolate applications or instances;
there is no account scoping or live cross-tab synchronization. Reads ignore
invalid values and clamp valid values to the configured bounds. Writes occur
only after completed width changes; blocked or full storage leaves resizing
available in memory. Changing the key reloads that preference or the CSS default.

An initially disabled sidebar keeps its CSS width and ignores saved preferences
until enabled. Disabling an already initialized sidebar retains its last width.
Changing bounds clamps the current width without emitting or saving. Bounds must
be positive finite numbers; invalid values fall back to 220/480, and a maximum
below the minimum is raised to the minimum.

## Sidebar menu state

`IHSidebar` persists explicit expand/collapse choices for groups, legacy modules
and Favorites in localStorage per browser origin. The `menuStateStorageKey` input
defaults to `'insight.sidebar.menu-state'`; use a custom key to isolate consumers
or `null` to keep choices in memory only. This does not enable `collapsible`.

```html
<ih-sidebar
  [user$]="user$"
  [menusInput$]="menus$"
  [collapsible]="true"
  menuStateStorageKey="my-app.sidebar.menu-state"
/>
```

Choices are keyed by modern `id` or legacy `menuId`; Favorites has its own
namespace. ID-less groups work in memory but do not persist across mounts.
Versioned storage ignores invalid entries and missing IDs. Blocked/full storage
does not prevent menu interaction. Changing the storage key loads its preferences;
temporary empty emissions and replacement menu arrays do not erase choices.
Consumer menu objects are not mutated.

Once initial routing has completed and menus are available, the sidebar opens
the ancestors of the current internal menu and positions that row 16px below the
top of the sidebar scroll area, including when it is already visible. The offset
is limited by the container's minimum and maximum scroll positions.
Exact routes and the longest segment-aligned prefix support detail URLs; query,
fragment and router base path do not change the match. The main tree takes
priority over a duplicate favorite, with Favorites as a fallback. Unmatched
routes do not scroll. Scrolling affects only the sidebar container, without
animation or keyboard focus changes.
If Favorites arrives first, a later main-tree match takes priority while initial
restoration is still undisturbed by user toggles or page navigation.

Restoration runs once per mount. Automatic ancestor expansion does not overwrite
saved choices, and users may collapse those groups again until the next refresh.
Subsequent page navigation cancels any pending restoration. Hidden sidebars and
search filters that hide the target defer scrolling until it is visible; search
text and URL filters remain intact. Temporary search expansion is not persisted.


### Active route highlighting

The current internal leaf menu has `is-active` and `aria-current="page"`.
Highlighting follows completed navigation, redirects and browser history, and
updates when menus or Favorites arrive. It is independent of keyboard search
selection (`is-selected`), expansion preferences and one-time scroll restoration.
Navigation updates the highlight without automatically reopening groups.

Matching uses the full menu tree before search filtering. Exact paths and the
longest segment-aligned prefix support detail URLs; query, fragment, trailing
slash and router base path do not change the match. The root route matches only
the root. Equal matches use the first menu in tree order. Absolute URLs,
protocol-relative URLs and query-only or fragment-only links are excluded.
The main tree takes priority, with Favorites as a fallback. Copies with the same
`id` (or legacy `menuId`) are highlighted in both sections. Unmatched routes clear
the highlight; filtering cannot transfer it to another menu.

Load the matching `insight-ui-css` stylesheet for the gray active background,
darker left accent, label and icon colors, semibold label and stronger hover
backgrounds. Favorite star colors and actions keep their existing styles. No
additional sidebar properties or menu contract fields are required.
