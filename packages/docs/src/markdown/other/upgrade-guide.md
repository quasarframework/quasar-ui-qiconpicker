---
title: Upgrade Guide
desc: Migrate to QIconPicker v3
keys: Help, upgrade, migration
related:
  - /getting-started/installation-types
  - /developing/using-qiconpicker
  - /other/releases
---

Use this guide to migrate from QIconPicker v2.x to QIconPicker v3.0.0-rc.0.

> QIconPicker v3 targets Vue 3, Quasar 2, and Quasar CLI Vite 3. If your app still uses Vue 2 or `@quasar/app-webpack`, migrate the app before installing QIconPicker v3.

> This guide focuses on the changes most likely to affect app code. Check the [Releases](/other/releases) page for the latest release-candidate notes, and please open an issue or PR if something is missing.

## QIconPicker v3.0.0 RC

QIconPicker v3 prepares the package for Quasar CLI Vite 3 and the shared app-extension workspace standard.

Important changes:

- The app extension is Vite-only and requires `@quasar/app-vite` >=3.0.0-rc.6.
- The webpack app-extension path is no longer supported.
- The package now uses ESM-first exports for Quasar/Vite consumers.
- UMD bundles remain available for CDN and CodePen examples.
- Built-in icon-set metadata now lazy loads from `@quasar/extras` v2 instead of generated icon arrays committed in this repo.
- The built-in Font Awesome, Ionicons, and MDI families now follow the current Extras v2 names: `fontawesome-v7`, `ionicons-v8`, and `mdi-v7`.
- The Material Symbols families are available as `material-symbols-outlined`, `material-symbols-rounded`, and `material-symbols-sharp`.
- Source files are TypeScript and SCSS.
- Documentation examples now include GitHub source and CodePen playground links through Q-Press where the example can run in UMD.
- Repository tooling now uses pnpm, oxlint, oxfmt, Vitest, and Rolldown.

## Requirements

| Area                          | QIconPicker v3 RC               |
| ----------------------------- | ------------------------------- |
| Vue                           | Vue 3                           |
| Quasar                        | Quasar 2                        |
| Quasar CLI                    | `@quasar/app-vite` >=3.0.0-rc.6 |
| App extension                 | Vite only                       |
| Icon metadata source          | `@quasar/extras` v2             |
| Node.js for this repo and CI  | `>=22.13`                       |
| Package manager for this repo | `pnpm >=11.4.0`                 |

## Installing the release candidate

QIconPicker v3 release candidates are published on the `latest` dist tag.

```tabs
<<| bash App Extension |>>
quasar ext add @quasar/qiconpicker
<<| bash pnpm |>>
pnpm add @quasar/quasar-ui-qiconpicker @quasar/extras@2
<<| bash bun |>>
bun add @quasar/quasar-ui-qiconpicker @quasar/extras@2
<<| bash yarn |>>
yarn add @quasar/quasar-ui-qiconpicker @quasar/extras@2
<<| bash npm |>>
npm install @quasar/quasar-ui-qiconpicker @quasar/extras@2
```

## App Extension Changes

The QIconPicker app extension now targets Quasar CLI Vite only.

- Install it only in apps using `@quasar/app-vite` >=3.0.0-rc.6.
- The extension registers the Vite boot file and stylesheet.
- The extension remains the recommended install path for Quasar apps because it handles plugin registration for you.

If you maintain your own boot file, import `defineBoot` from `#q-app`:

```ts
import { defineBoot } from '#q-app'
import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

export default defineBoot(({ app }) => {
  app.use(Plugin)
})
```

## Built-In Icon Sets

QIconPicker v3 uses `@quasar/extras` v2 as the source of truth for built-in icon sets. Your app should have `@quasar/extras@2` installed when using the `icon-set` prop.

Supported built-in `icon-set` values are:

- `material-icons`
- `material-icons-outlined`
- `material-icons-round`
- `material-icons-sharp`
- `material-symbols-outlined`
- `material-symbols-rounded`
- `material-symbols-sharp`
- `ionicons-v8`
- `mdi-v7`
- `fontawesome-v7`
- `eva-icons`
- `themify`
- `line-awesome`
- `bootstrap-icons`

If you previously imported generated icon arrays from QIconPicker, switch to the `icon-set` prop or provide your own `icons` array.

```vue
<q-icon-picker v-model="icon" icon-set="material-icons" />
```

For custom collections, pass an `icons` array. The `name` value is emitted by `v-model`, and the optional `icon` value can provide SVG path data when you do not want to rely on an icon font.

```ts [twoslash]
interface PickerIcon {
  name: string
  icon?: string
}

const icons: PickerIcon[] = [{ name: 'camera_alt' }, { name: 'photo_camera' }, { name: 'videocam' }]

icons[0]?.name
// ^?
```

## Direct UI Package Usage

Compiled package imports are the recommended path:

```ts [twoslash]
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

QIconPicker
// ^?
```

Import the component stylesheet alongside the component:

```ts
import '@quasar/quasar-ui-qiconpicker/dist/index.css'
```

Direct `src/` imports are still available for advanced use cases. With Quasar CLI Vite 3, dependency transpilation is automatic, so no additional transpile-dependency configuration is needed.

```ts
import Plugin from '@quasar/quasar-ui-qiconpicker/src/index'
import '@quasar/quasar-ui-qiconpicker/src/index.scss'
```

## CodePen And UMD Examples

The documentation examples use the UMD bundle when opening in CodePen.

If you maintain custom CodePen or script-tag examples, load the QIconPicker CSS and UMD bundle after Quasar:

```html
<link
  href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@3.0.0-rc.0/dist/index.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@3.0.0-rc.0/dist/index.umd.min.js"></script>
```

Then register the plugin from the browser global:

```js
app.use(QIconPicker)
```

The UMD build is intended for manually supplied `icons` arrays. Built-in `icon-set` values rely on bundler support for `@quasar/extras` lazy imports, so the docs only enable CodePen for examples that can run from UMD without a bundler.

## Contributor Tooling Changes

The QIconPicker repository now uses:

- `pnpm@11.4.0`
- Node.js `>=22.13`
- `oxlint` instead of ESLint
- `oxfmt` instead of Prettier
- Vitest for runtime coverage
- Rolldown for UI package builds

Use the existing scripts for local verification:

```bash
pnpm format:check
pnpm lint
pnpm test
pnpm build
pnpm typecheck
```
