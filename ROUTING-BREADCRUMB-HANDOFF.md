# insight-ui-angular: routing and breadcrumb handoff

> Historical source snapshot. See the [2026-10-15 integration report](../atlas-web/ROUTING-BREADCRUMB-INTEGRATION.md) for current branches, automatic ConfigMap bootstrap, dependencies, and rollout.

This handoff records the local branch comparison performed on 2026-10-14.
It includes committed feature-branch changes **and uncommitted working-tree
changes** relative to the baseline below. Local branch references were used;
remote branches were not fetched. Subsequent edits are outside this snapshot.

Baseline: local `release` at `fe2d6cd`.

## Shared routing contract

The host owns public URLs and host breadcrumb ancestry. Remotes supply selected
route collections and their own breadcrumb levels.

```json
{
  "path": "sales",
  "title": "Sales",
  "children": [
    {
      "path": "customer",
      "title": "Customer",
      "remoteName": "atlas-angular",
      "routeName": "docsRoutes"
    }
  ]
}
```

```text
Public URL:   /-/sales/customer
Remote entry: /apps/atlas-angular/remoteEntry.json
Collection:   docsRoutes
Breadcrumb:   Sales > Customer > remote route labels
```

`children` supports further nesting. Paths are relative to parents. A node
must declare a remote or nonempty children. Configured host titles override
menu-derived ancestry; registrations without host titles retain the menu
fallback. A group without a remote has no landing page.

The host assigns the runtime federation alias using `remoteName`; it may
differ from the remote's fixed build name. Each remote must be deployed at
`/apps/{remoteName}/remoteEntry.json`. The defaults for omitted `routeName`
are `routes` for Angular and `contentRoutes` for React.

## Changes from release

Affected files are under `projects/insight-ui/src/lib/host/`:

- `content/content.ts` and new integration tests
- `host.types.ts`
- `menu/menu.utils.ts` and new matching tests
- `shell/title-breadcrumb.service.ts` and new ownership tests

## Behavior

- Composes host ancestry, Angular remote route labels, and React bridge
  contributions into one trail.
- Explicit `hostBreadcrumbs` from configured host titles take precedence
  over backend menu ancestry.
- Untitled host registrations use the longest segment-aligned menu route
  match; the tree supplies parent labels.
- Menu loading and React contribution changes update the trail reactively.
- Page headings are independent of breadcrumb labels.
- Adds typed `breadcrumb?: string | false`, `remoteMount`, and
  `hostBreadcrumbs` route metadata.
- Uses consumed primary-outlet route segments to construct URLs, including
  resolved parameters.
- Handles text-only breadcrumb items and base-prefixed navigation links.

## Shell service contract

New APIs:

```ts
setRemoteTitle(title: string | null): void
setRemoteBreadcrumbs(items: IBreadcrumbItem[] | null): void
clearRemote(): void
```

These update only the remote contribution. Existing `setTitle()` and
`setBreadcrumbs()` remain complete overrides, including access-error states.
`clear()` clears all override and contribution state. A null remote trail
means no remote breadcrumb contribution; host ancestry remains visible.

## Contributor actions

1. Publish the library changes and upgrade consuming applications.
2. Upgrade the host before using the new remote-contribution methods.
3. Preserve the distinction between complete overrides and remote-only state
   in custom host bridges.
4. Align resolved Angular/shared UI versions across federated Angular apps.
5. Verify configured-title precedence, menu fallback, suppression, errors,
   and navigation after integration.

## Compatibility

Existing complete override APIs are retained. Custom code that previously
used `setBreadcrumbs()` to replace the whole trail will still replace it;
use `setRemoteBreadcrumbs()` when the intent is to append remote levels.

## Verification and rollout

Relevant tests and builds passed during implementation. The branch-comparison
audit did not rerun all checks. Recorded checks include host routing tests,
local template-generation tests, shared Angular breadcrumb integration tests,
both remote unit suites/builds, and React UI suppression/permission tests,
typecheck, lint, and library build.

Nothing was deployed as part of this work. After publishing dependencies and
updating ConfigMaps, verify authenticated deep links, selected collections,
mount switching, back/forward navigation, breadcrumb links, standalone mode,
unknown routes, and denied-page behavior with the deployed host and remotes.

## UI parity follow-up (2026-10-15)

React now implements equivalent host/remote composition, reactive menu fallback,
remote-only setters and clearRemote, alongside full overrides and independent
headings. React route metadata uses direct IRoute properties while Angular
uses route data. See ../insight-ui-react/README.md for the React host adapter.

Angular now respects setBreadcrumbs([]) as an explicit empty override and shows
the Home placeholder. setBreadcrumbs(null) restores the composed route trail.
The regression is covered by the content composition test.
