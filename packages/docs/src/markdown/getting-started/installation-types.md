---
title: Installation Types
desc: How to install QIconPicker
keys: Getting Started
related:
  - /getting-started/introduction
  - /other/contributing/bugs-and-feature-requests
  - /other/contributing/sponsor
---

QIconPicker can be installed as a Quasar App Extension, as a Vue plugin, as a direct component import, or through the UMD bundle.

For Quasar CLI projects, the App Extension is the recommended path because it registers the boot file and adds the stylesheet for you.

## Quasar CLI

### App Extension

To add QIconPicker to your Quasar application, run the following in your Quasar app folder:

```bash
quasar ext add @quasar/qiconpicker
```

While QIconPicker v3 is in beta, install with:

```bash
quasar ext add @quasar/qiconpicker@beta
```

The QIconPicker v3 App Extension targets Quasar CLI Vite 3 and requires `@quasar/app-vite` v3 beta. It does not support webpack-based Quasar applications.

### Uninstall

```bash
quasar ext remove @quasar/qiconpicker
```

### Describe

When installed as an App Extension, you can use:

```bash
quasar describe QIconPicker
```

### Manual Boot File

If you do not install through the App Extension, install the UI package directly:

```bash
pnpm add @quasar/quasar-ui-qiconpicker@beta
# or
bun add @quasar/quasar-ui-qiconpicker@beta
# or
yarn add @quasar/quasar-ui-qiconpicker@beta
# or
npm install @quasar/quasar-ui-qiconpicker@beta
```

Then create and register a boot file:

```js
import { defineBoot } from '@quasar/app-vite'
import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

export default defineBoot(({ app }) => {
  app.use(Plugin)
})
```

### Manual Source Import

You can import from source when you need to transpile/customize the package in your app:

```js
import { defineBoot } from '@quasar/app-vite'
import Plugin from '@quasar/quasar-ui-qiconpicker/src/index.ts'

export default defineBoot(({ app }) => {
  app.use(Plugin)
})
```

Then add the source stylesheet to `quasar.config.*`:

```js
// Note: using ~ tells Quasar the file resides in node_modules
css: ["app.scss", "~@quasar/quasar-ui-qiconpicker/src/index.scss"],

build: {
  transpile: true,
  transpileDependencies: [/quasar-ui-qiconpicker[\\/]src/],
}
```

### Quasar Component Import

```html
<style src="@quasar/quasar-ui-qiconpicker/dist/index.css"></style>

<script setup lang="ts">
  import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'
</script>
```

## Icon Set Loading

QIconPicker lazy loads built-in icon-set names and SVG path data from `@quasar/extras`. This keeps the QIconPicker package from duplicating Quasar Extras metadata and means only the selected icon set is loaded by your app.

Make sure your app has `@quasar/extras` installed:

```bash
pnpm add @quasar/extras@2
```

```bash
bun add @quasar/extras@2
```

```bash
yarn add @quasar/extras@2
```

```bash
npm install @quasar/extras@2
```

Because icons are rendered from SVG path data, you do not need to preload the matching icon font CSS just for QIconPicker to display built-in sets.

## Vue 3 Or Vite

### Vue Plugin

```js
import { createApp } from 'vue'
import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(Plugin)
app.mount('#app')
```

### Vue Component Import

```html
<style src="@quasar/quasar-ui-qiconpicker/dist/index.css"></style>

<script setup lang="ts">
  import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'
</script>
```

## UMD Variant

The UMD bundle exports `window.QIconPicker`.

Add the following tags after the Quasar stylesheet and script tags:

```html
<head>
  <link
    href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.min.css"
    rel="stylesheet"
    type="text/css"
  />
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.umd.min.js"></script>
</body>
```

If you need the RTL variant of the CSS, use this stylesheet instead:

```html
<link
  href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.rtl.min.css"
  rel="stylesheet"
  type="text/css"
/>
```

The UMD build is intended for manually supplied `icons` arrays. Built-in `icon-set` values rely on bundler support for `@quasar/extras` lazy imports.

```warning
QIconPicker v3 follows `@quasar/extras` v2. Supported built-in `icon-set` values are:

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
```

## Working With QIconPicker

QIconPicker uses `@quasar/extras` as the source of truth for built-in icon sets, so the picker can render without hand-maintained metadata in this repo.

If you provide your own `icons` array, `name` is the selected value emitted by `v-model`. The optional `icon` property can provide SVG path data for display.

::: warning
Most icon sets are very large, which may cause performance issues.
:::

::: tip
QIconPicker needs a specified height in its style, or in a parent style.
:::
