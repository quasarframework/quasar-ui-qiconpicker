# QIconPicker

QIconPicker is a Quasar component that provides an icon picker for Vue and Quasar applications.

[![npm](https://img.shields.io/npm/v/@quasar/quasar-ui-qiconpicker/beta?label=@quasar/quasar-ui-qiconpicker)](https://www.npmjs.com/package/@quasar/quasar-ui-qiconpicker)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-ui-qiconpicker)](https://www.npmjs.com/package/@quasar/quasar-ui-qiconpicker)

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

## Usage

### Quasar CLI Project

Install the [App Extension](../app-extension).

Or install the UI package directly:

```bash
pnpm add @quasar/quasar-ui-qiconpicker@beta
# or
bun add @quasar/quasar-ui-qiconpicker@beta
# or
yarn add @quasar/quasar-ui-qiconpicker@beta
# or
npm install @quasar/quasar-ui-qiconpicker@beta
# or, in a Quasar CLI app
quasar ext add @quasar/qiconpicker@beta
```

Then create and register a boot file:

```js
import { defineBoot } from '#q-app'
import VuePlugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

export default defineBoot(({ app }) => {
  app.use(VuePlugin)
})
```

### Vue 3 Project

```js
import { createApp } from 'vue'
import VuePlugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(VuePlugin)
app.mount('#app')
```

### Component Import

```html
<style src="@quasar/quasar-ui-qiconpicker/dist/index.css"></style>

<script setup>
  import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'
</script>
```

### UMD Variant

The UMD bundle exports `window.QIconPicker`.

```html
<link
  href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.min.css"
  rel="stylesheet"
  type="text/css"
/>
<script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.umd.min.js"></script>
```

Built-in `icon-set` values lazy load from `@quasar/extras` and are intended for ESM bundler usage. For UMD, pass an `icons` array directly.

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

## Setup

This project is a pnpm workspace mono-repo.

```bash
pnpm install
pnpm build:ui
pnpm build:docs
```

## Support

If QIconPicker is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

## License

MIT (c) Jeff Galbraith <jeff@quasar.dev>
