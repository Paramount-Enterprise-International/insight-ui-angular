# InsightUiAngular

## Host shared state

`IHStateOwner` is created once by the host. Namespaces use `session` by default;
`temporary` survives navigation until refresh, and `local` explicitly uses
persistent browser storage. Additional adapters implement synchronous `getItem`,
`setItem`, and `removeItem`; register them in the owner constructor.

Register namespace configuration before first use; conflicting storage settings
throw. State values are detached, frozen JSON-compatible snapshots. Update through
the API instead of mutating returned objects. `get` fallbacks are not persisted.
Read/write/remove failures are exposed by `getError(namespace)` without changing
storage. No asynchronous adapters or live cross-tab broadcasting are included.

Scope the owner prefix to the application, synchronize `setIdentity` after session
restoration, and clear it with `setIdentity(null)` on logout. The identity must
include the subject and impersonation context, and stay stable during token refresh.
Identity changes discard the previous and replacement contexts. Hosted remotes
reuse the owner; standalone selectors do not create a persistent owner implicitly.

Provide `IH_STATE` once in the host with the owner as its value/factory. Federated
Angular routes inherit it through the shared injector and library singleton.

```ts
readonly state = inject(IHState);
readonly count = this.state.select('shared.filters', 'count', 0);

increment(): void {
  this.state.update('shared.filters', 'count', 0, count => count + 1);
}
```

`IHState` exposes `registerNamespace`, `get`, `set`, `update`, `remove`,
`clearNamespace`, `getError`, `subscribe`, and `selection`. `select` returns a
signal and uses the calling injection context's DestroyRef; pass one explicitly
outside that context. Manual subscriptions return an unsubscribe function.

Hosted company selectors automatically use the shared company/project context.
Initial consumer values do not replace host candidates. Add `stateScope="local"`
for independent record fields. Company options are scoped to the active menu;
missing mapping/loading does not expand access to all companies. A successful
validation that excludes the company resets both company and project. Pages
without selectors retain candidates. Restore/reset synchronizes value-change
callbacks; `onOptionSelected` remains user-only.

`selection` stores only company ID/project key in the reserved `shared.selection`
session namespace. Use `setCompany`/`setProject` for changes. On company/menu
changes, call `beginProjects`, load authoritative options in the remote, and call
`resolveProjects(token, canonicalKeys)` or `rejectProjects(token, message)`.
Check the returned boolean before accepting rows; stale responses are rejected.
Cancel page-owned requests or ignore their results on cleanup. Candidate project
keys survive a company change if still available. Do not validate absence using
only a search result page. Require both selected IDs and ready statuses before
business requests.

`loading` is supported by selects and form-control variants and combines with
`options$` loading. Company selectors derive authorization loading automatically;
remote-owned project selects receive explicit loading/disabled states.

See the [platform integration guide](../docs-sso-web/public/docs/sso/iam-sso-integration-guide_v2.md#ihstate-shared-state-and-companyproject-selection)
and both atlas-remote Host Integration examples. New exports require an updated
library dependency before consumer compilation; no version is implied by this source change.

## Select empty states

`ISelect`, `IFCSelect`, `ISelectCompany`, and `IFCSelectCompany` accept
`emptyState: ISelectEmptyState`, where the exported type is
`string | { empty?: string; notFound?: string }`.

A string overrides only the empty-source message. An object overrides each message
independently; omitted properties default to `"No options available"` for `empty`
and `"No results found"` for `notFound`.

```html
<i-fc-select emptyState="No options yet" [options]="options" />
<i-select-company [emptyState]="{ empty: 'No companies', notFound: 'Company not found' }" />
```

An empty source always uses `empty`, including during a search. A nonempty source
with no matches uses `notFound` after the normal filter debounce (and minimum
filter length where supported). Messages are plain, nonselectable status text in
the dropdown and are hidden while explicit or observable loading is active.
Company selects use their existing authorization loading state. Load matching
Insight CSS to style the status text.

## Company selects

`ISelectCompany` (`i-select-company`) and `IFCSelectCompany`
(`i-fc-select-company`) read company options reactively from `IUserMenuStore`.
Configure auth and load the store at application level; the components never
fetch data themselves. See [authorization data](#authorization-codes-and-navigation)
for the store's company scope contract.

```ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFCSelectCompany, ISelectCompany, type IMenuCompanyDto } from '@insight/ui';

@Component({
  standalone: true,
  imports: [ISelectCompany, IFCSelectCompany, ReactiveFormsModule],
  template: `
    <i-select-company [value]="selectedCompany" (onChanged)="selectedCompany = $event.value" />
    <i-select-company
      menuCode="sales"
      [value]="selectedCompany"
      (onChanged)="selectedCompany = $event.value"
    />
    <i-fc-select-company label="Company" menuCode="sales" [formControl]="companyControl" />
  `,
})
export class CompanyFilter {
  selectedCompany: IMenuCompanyDto | null = null;
  readonly companyControl = new FormControl<IMenuCompanyDto | null>(null, Validators.required);
}
```

In local mode, omitting `menuCode`, or passing a blank value, shows all `store.companies`.
A nonblank code is trimmed and restricts options through
`store.menuCompanies[menuCode]`. An unknown menu shows no options. Store ordering
and deduplication are preserved.

Values are company objects (`id`, `code`, `name`) or `null`. Labels default to
`name`; search matches `name` and `code` without case sensitivity. `displayWith`,
`filterPredicate`, `iSelectOption` templates, dropdown settings, `invalid`,
`disabled`, and `focus()` follow the regular select. Options are store-owned;
there are no `options` or `options$` inputs.

Both components support `[value]`, `ngModel`, `formControl`, and `formControlName`.
Selection emits `onChanged` and `onOptionSelected` with `ISelectChange<IMenuCompanyDto>`;
Angular form bindings receive the company object directly. No company is selected
automatically. In local mode, refresh matches a selected option by `id` without emitting events
or replacing the consumer's value. In local mode, if a menu change, refresh, or reset removes
the selected company from the options, its value remains until the consumer resets it.

The form-control counterpart adds `label`, required indication, and `errorMessage`
using the same validation timing as `IFCSelect`: after form submission when inside
a reactive form group, otherwise after the control is touched or dirty.
Load matching Insight CSS for both company selectors and their regular counterparts.

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

When resizing is enabled, a 4px lane inside the sidebar separates the resize
handle from the menu scrollbar. The total sidebar width stays unchanged; only
the menu body reserves this space. Disabling resizing removes the lane.

Pointer resizing updates the sidebar and content live, at most once per
animation frame, without triggering menu change detection on pointer movement.
Menu indentation stays fixed while long labels truncate with an ellipsis.

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

`IHSidebar` persists explicit expand/collapse choices only for top-level headers,
including legacy modules and Favorites, in localStorage per browser origin.
The `menuStateStorageKey` input defaults to `'insight.sidebar.menu-state'`;
use a custom key to isolate consumers or `null` to keep choices in memory only.
This does not enable `collapsible`.

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
In collapsible mode, nested containers start collapsed on each mount, even when
their payload or an older stored preference marks them expanded. Their manual
choices remain in memory across navigation, replacement arrays and temporary empty
emissions, and reset on remount. Root headers retain their existing default
visibility unless a saved or manual choice overrides it. Nesting is determined
from the tree, independently of payload `level` values.
The version 1 storage format is unchanged; old nested entries are ignored and
the next toggle saves only preferences for known top-level headers from both
the main and Favorites sections.
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
Search opens every ancestor of a match, including collapsed legacy modules.
Matching a container displays and opens its entire descendant branch. Search
results can then be collapsed or expanded without changing normal menu choices
or localStorage. These temporary choices survive menu hydration for the same
trimmed term and reset when the applied term changes. Clearing
the search restores the previous expansion state. Flat mode
(`collapsible=false`) continues to display every level.

Search input updates immediately. Filtering, highlighting, and the `menu-filter`
URL parameter update together after 200 ms without further input; initial URL
filters apply immediately. URL updates replace the history entry and preserve
other query parameters and the fragment. Page navigation and unmount cancel
pending search work. Arrow keys and Enter flush a pending filter before acting;
Enter still requires an explicitly selected result. Keyboard navigation skips
leaves inside collapsed search groups. Favorites retain their existing behavior.

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

## Shared presentation components

The Angular package exports `IActionPlaceholder`, `IBanner`, `IEmptyState`,
`IHighlightSearch`, `ILoadError`, `ILoadingRegion`, and `IImageCropper`.
Load the matching insight-ui-css build; these components share its tokens and surface rules.

- `IButton.placeholder` defaults to false. When true, it renders only an inert,
  decorative placeholder using the button's current `size`. No button/link, icon,
  spinner, children, submit/reset, or navigation is rendered. `IActionPlaceholder`
  is also available independently; its default size matches IButton (`md`).
- `IBanner` accepts `message` and projected content/children, plus `prefixIcon`
  and `suffixIcon`. Content renders after the message. Variants are `neutral`,
  `primary`, `success`, `info` (default), `warning`, and `danger`.
  Neutral is unaccented gray. Primary follows --i-color-primary; info follows
  --i-color-info (cyan in the default theme). Messages are text;
  rich content is supplied as framework children, never an HTML string.
- `closable` defaults to false. Without `open`, banner state starts at
  `defaultOpen` (true) and Close immediately dismisses it. With `open`, visibility
  is controlled by the parent. Angular exposes `openChange` for `[(open)]`;
  React exposes `onOpenChange`. Both expose `onClose` and `closeLabel` (default
  `Close`). Changing content does not reopen a dismissed instance.
- `IEmptyState` supports `empty`, `search`, `filter`, `search-filter`, and
  `prerequisite`, with title/description/icon overrides, density, and children/CTA.
- `IGrid.emptyState` configures the built-in empty state. Angular provides an
  `ng-template iGridEmptyDef` slot; React provides `renderEmptyState`. The slot
  receives the resolved config. Keep business prerequisites outside the grid.
  Initial empty data hides grid chrome. Search/filter no-result keeps headers
  and pagination, reserving pageSize times `--i-grid-empty-row-height`
  (default `--i-size-md`) inside the scrolling viewport. Tree/non-paginated
  empty states use the shared default state height. Keep the grid mounted when search returns no rows.
  `IGridDataSource.filteredLength` exposes the total before local pagination;
  `length` retains its existing raw/server meaning. Server-owned search state
  and copy must follow the successful response that populated the displayed rows.
- `IHighlightSearch` accepts `value` (string/number/null/undefined) and `search`.
  It renders plain text and highlights literal, case-insensitive matches. The
  Angular `IHighlightSearchPipe` remains available with its existing contract.
- `ILoadError` accepts message/title, `density` (`default`, `compact`, `inline`),
  retryDisabled/retryLoading, and `onRetry`. The application owns recovery requests.
- `ILoadingRegion` retains DOM and measured height during refresh, sets aria-busy,
  and blocks content with inert. Its inputs/props include loading, error, label,
  contextKey, initialMinHeight, height, containerClass, contentClass, and layout.
  Angular exposes `hasLoaded`; React also accepts children as `({hasLoaded}) => ...`.
  Owners retain data and reject stale responses when context changes.
- `IImageCropper` supplies zoom/pan and keyboard repositioning without a dialog,
  picker, or upload. Inputs/props include src, disabled, viewportSize (240), shape
  (`square`/`circle`), minZoom (1), maxZoom (3), alt, zoomLabel, and panLabel.
  `onReady`/`onError` report image state. Angular component references and the React
  `IImageCropperHandle` ref expose `exportImage({mimeType, quality})`, returning
  a Promise with blob/dataUrl/mimeType/width/height. Exports preserve source crop
  resolution without upscaling; circle is a preview mask and output stays square.
  Source changes/destruction invalidate pending exports. Remote images must permit
  canvas export; export failures reject the Promise. File limits remain app-owned.

### Grid column minimum width

`IGridColumn` and `IGridCustomColumn` accept an optional numeric `minWidth` in
pixels, including inside column groups. It applies to the initial layout and
drag resizing, keeping header and body cells aligned. A numeric or resized width
below the minimum is clamped, and frozen offsets use the clamped width.

```html
<i-grid-column fieldName="name" title="Name" width="fill" [minWidth]="120" />
<i-grid-custom-column title="Actions" [width]="45" />
```

Without `minWidth`, only `width="fill"` gets a default minimum of **150px**,
including auto-generated columns. Fill columns keep sharing available space;
the viewport scrolls horizontally when the columns no longer fit. Numeric and
omitted widths have no default minimum, so a 45px action column stays 45px and
can resize below 50px. The initial width when `width` is omitted remains 200px.
An explicit minimum overrides the fill default and may be below 150px.
Changing `minWidth` also constrains an existing resized width.

### Automatic surface layout

Section body and loading region default to `layout="auto"`, with `padded` and
`flush` overrides. Section owns padding and corner radii. A sole child marked
`data-i-surface="delegate"` receives the padding responsibility; a sole `flush`
child takes the full area. Loading regions delegate and grids are flush.
Nested wrappers consume padding once. Content, grid, and overlays share per-corner
surface radii, while form focus rings and dropdowns retain their normal overflow.
App wrappers can implement the same marker contract or use an explicit override.

The shared --i-state-min-height token defaults to min(40vh, 240px).
Initial loading and default-density empty presentations reserve the same height.
An explicit initialMinHeight on a loading region also applies to its empty content.
Padding is counted once, including standalone prerequisites inside a region.
Compact empty states retain natural height. Paginated search/filter no-result still
uses pageSize times the nominal row height; bounded grids can shrink to their viewport.
Content larger than the baseline can expand normally.

### Migration from local IAM components

Use the exported components instead of the removed IAM presentation wrappers.
Replace `iam-error-banner` with `i-banner variant="danger"`; map icon to prefixIcon.
Replace `iam-load-error` retry bindings with `onRetry`. Remove `seamlessGrid` and
IAM-specific surface CSS when switching to ILoadingRegion.

**Breaking removal:** `IInfoNotice`, `IInfoNoticeProps`, `i-info-notice`, and its
CSS tokens have been removed. Use IBanner with variant info and prefixIcon info.
Preserve a notice title as a strong element in projected content/children.
The session-specific IHImpersonationBanner API remains available.

Component playground pages are independent:

- `/action-placeholder`: Action Placeholder.
- `/banner`: Banner.
- `/empty-state`: Empty State.
- `/highlight-search`: Highlight Search.
- `/load-error`: Load Error.
- `/loading-region`: Loading Region.
- `/image-cropper`: Image Cropper.

The former `/shared-ui` route redirects to `/action-placeholder`.
These library playground routes require no IAM menu or access code.

**Banner rename:** use `neutral` instead of the former `default` variant.
Omitting variant still selects info.
