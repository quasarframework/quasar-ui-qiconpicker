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
pnpm add @quasar/quasar-ui-qiconpicker
# bun add @quasar/quasar-ui-qiconpicker
# yarn add @quasar/quasar-ui-qiconpicker
# npm install @quasar/quasar-ui-qiconpicker
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
import Plugin from '@quasar/quasar-ui-qiconpicker/src/index.js'

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

## Icon Set Preloading

If you are using a large icon set and find it is taking too long to load, you can pre-cache the UMD variant.

You can do this by adding to your `App.vue`, or any other appropriate file, one or more of the UMD icon-set variants:

```js
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/eva-icons.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/fontawesome-v5.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/fontawesome-v6.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/ionicons-v6.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/ionicons-v7.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons-outlined.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons-round.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons-sharp.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-symbols-outlined.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-symbols-rounded.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-symbols-sharp.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/mdi-v6.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/mdi-v7.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/themify.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/line-awesome.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/bootstrap-icons.umd.js'
```

Do not preload all icon sets unless your app really needs them.

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

For UMD variants only, you must also load the QIconPicker icon set for the icon font that you have loaded:

```html
<script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons.umd.js"></script>
```

Choices are:

1. `eva-icons.umd.js`
2. `fontawesome-v5.umd.js`
3. `fontawesome-v6.umd.js`
4. `ionicons-v6.umd.js`
5. `ionicons-v7.umd.js`
6. `material-icons-outlined.umd.js`
7. `material-icons-round.umd.js`
8. `material-icons-sharp.umd.js`
9. `material-icons.umd.js`
10. `material-symbols-outlined.umd.js`
11. `material-symbols-rounded.umd.js`
12. `material-symbols-sharp.umd.js`
13. `mdi-v6.umd.js`
14. `mdi-v7.umd.js`
15. `themify.umd.js`
16. `line-awesome.umd.js`
17. `bootstrap-icons.umd.js`

```warning
QIconPicker only keeps the latest two versioned icon-set families. For MDI, use `mdi-v6` or `mdi-v7`.
```

## Working With QIconPicker

QIconPicker works with any of the defined [Quasar Icon Sets](https://quasar.dev/options/quasar-icon-sets). For this to work properly, make sure the icon set is included in your `quasar.config.* > extras`.

::: warning
Most icon sets are very large, which may cause performance issues.
:::

::: tip
QIconPicker needs a specified height in its style, or in a parent style.
:::

## Categories And Tags

QIconPicker can emit categories/tags for the associated loaded icon set.

The Eva and Material Design icon sets have tag data. Font Awesome v5 and v6 are partially tagged. PRs are welcome for any icon set that needs more complete tag coverage.

You can get the tags with the `tags` event:

```html
<q-icon-picker
  v-model="name"
  v-model:model-pagination="pagination"
  :filter="filter"
  :icon-set="iconSet"
  :tags="tags"
  font-size="3em"
  tooltips
  style="height: calc(100vh - 140px)"
  @tags="onTags"
/>
```

Capturing tags needs a guard to prevent a potential loop in your Vue code, depending on how you use it:

```js
const loaded = ref(false)
const tags = ref([])
const selected = ref({})
const categories = ref([])

function onTags(newTags) {
  if (loaded.value === true) {
    return
  }

  categories.value.splice(0, categories.value.length, ...newTags)
  loaded.value = true
}
```

Reset the guard when switching icon sets:

```js
watch(
  () => iconSet.value,
  () => {
    loaded.value = false
    tags.value.splice(0, tags.value.length)
  },
)

watch(
  () => selected.value,
  (value) => {
    const nextTags = categories.value.filter((category) => value[category] === true)
    tags.value.splice(0, tags.value.length, ...nextTags)
  },
  { deep: true },
)
```
