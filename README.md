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
