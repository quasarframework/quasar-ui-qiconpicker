---
title: FAQ
desc: Common QIconPicker development questions
keys: developing
related:
  - /developing/using-qiconpicker
  - /getting-started/installation-types
---

This page collects common QIconPicker development questions. It will keep growing as issues, discussions, and real-world usage uncover better guidance.

## Installation and setup

:::details Q. Should I install the App Extension or the UI package directly?

For Quasar CLI Vite apps, use the App Extension when possible:

```bash
quasar ext add @quasar/qiconpicker
```

While QIconPicker v3 is in beta, use:

```bash
quasar ext add @quasar/qiconpicker@beta
```

The App Extension registers the boot file and stylesheet for you. Install the UI package directly only when you want to register QIconPicker manually or use it outside the App Extension flow.

:::

:::details Q. Does QIconPicker v3 support webpack-based Quasar apps?

No. QIconPicker v3 targets Quasar CLI Vite 3 and requires `@quasar/app-vite` v3 beta. If your app still uses `@quasar/app-webpack`, migrate the app to Quasar CLI Vite before installing QIconPicker v3.

:::

:::details Q. Do I need to import QIconPicker CSS myself?

The App Extension adds the stylesheet for you.

If you install the UI package directly, import the stylesheet in your boot file or app entry:

```ts
import '@quasar/quasar-ui-qiconpicker/dist/index.css'
```

:::

## Icon sets

:::details Q. Where do built-in icon sets come from?

QIconPicker uses `@quasar/extras` as the source of truth for built-in icon set names and SVG path data. This keeps QIconPicker from duplicating large generated icon arrays in its own package.

Install `@quasar/extras` alongside QIconPicker when using built-in `icon-set` values:

```tabs
<<| bash pnpm |>>
pnpm add @quasar/extras@2
<<| bash Bun |>>
bun add @quasar/extras@2
<<| bash Yarn |>>
yarn add @quasar/extras@2
<<| bash npm |>>
npm install @quasar/extras@2
```

:::

:::details Q. Which built-in icon sets are supported?

QIconPicker v3 follows the icon families exposed by `@quasar/extras` v2. These built-in `icon-set` values are supported:

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

Older sets such as `fontawesome-v6`, `ionicons-v7`, `mdi-v6`, and previous major families are not part of QIconPicker v3.

:::

:::details Q. Do I need to preload icon font CSS?

Not for QIconPicker's built-in sets. QIconPicker renders built-in sets from SVG path data loaded from `@quasar/extras`, so the picker itself does not need the matching icon font CSS.

If your application displays the selected icon elsewhere with Quasar's normal icon-font syntax, make sure that target icon set is available to your application in the usual Quasar way.

:::

:::details Q. Can I provide my own icons?

Yes. Pass an `icons` array when you want a curated picker or a custom icon collection:

```ts
const icons = [
  { name: 'camera', icon: 'photo_camera' },
  { name: 'github', icon: 'fab fa-github' },
]
```

The `name` is the value emitted by `v-model`. The optional `icon` value controls what QIconPicker displays.

:::

:::details Q. What happened to icon tags?

The old generated `tags` metadata was removed in QIconPicker v3. It was not consistently maintained across icon families and was not reliable enough to keep as part of the API.

Use filtering against icon names, or provide a custom `icons` array if your application needs curated categories or search metadata.

:::

## Usage

:::details Q. What value does `v-model` receive?

`v-model` receives the selected icon name. For built-in sets that require a Quasar prefix, QIconPicker includes the prefix in the emitted value, such as `fas camera` or `mdi-home`.

For custom `icons` arrays, QIconPicker emits the `name` you supplied.

:::

:::details Q. Why does QIconPicker need an explicit height?

QIconPicker virtualizes and paginates a dense grid of icon buttons. Give the picker, or one of its parents, a defined height so it can calculate the visible area correctly:

```html
<q-icon-picker v-model="icon" icon-set="material-icons" style="height: 320px" />
```

:::

:::details Q. Can I customize how each icon is rendered?

Yes. Use the `icon` slot when you need custom button content, labels, previews, or application-specific behavior.

See [Using QIconPicker](/developing/using-qiconpicker) for the slot and styling examples.

:::

:::details Q. Why can large icon sets still produce chunk-size warnings?

Some icon sets are huge. QIconPicker lazy loads built-in sets so the main component stays small, but an individual selected set such as Material Symbols, Font Awesome, Ionicons, or MDI can still be large.

For the smallest application payload, prefer a custom `icons` array with only the icons your users need.

:::

## UMD

:::details Q. Can the UMD build use built-in `icon-set` values?

The UMD build is intended for manually supplied `icons` arrays. Built-in `icon-set` values rely on ESM/CJS bundler support for lazy imports from `@quasar/extras`.

If you are using script tags only, pass your own `icons` array instead of using `icon-set`.

:::

## Troubleshooting

:::details Q. The picker renders icon names as text. What should I check?

If you are using built-in sets, make sure `@quasar/extras` is installed and your package manager resolved the expected version.

If you are using a custom `icons` array, make sure each entry has either a displayable Quasar icon name or SVG path data in `icon`.

:::

:::details Q. How do I inspect the QIconPicker API?

The docs API table is generated from `QIconPicker.json` and shown on the [Using QIconPicker](/developing/using-qiconpicker) page.

If the App Extension is installed, you can also run:

```bash
quasar describe QIconPicker
```

:::

:::details Q. Where should I report bugs or ask questions?

Use [GitHub Issues](https://github.com/quasarframework/quasar-ui-qiconpicker/issues) for bugs and feature requests. Use [GitHub Discussions](https://github.com/quasarframework/quasar-ui-qiconpicker/discussions) for broader questions, RFCs, or implementation discussion.
:::
