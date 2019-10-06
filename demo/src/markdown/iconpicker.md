QIconPicker
===

QIconPicker is an icon picker for your Quasar application. It allows you to have an icon selector embedded in your app. It uses a [Quasar Icon Set](https://quasar.dev/options/quasar-icon-sets) or you can pass in an array of objects defining the icons to be displayed.

# Installation Types

## Quasar CLI

**App Extension**

:::
#### Install

To add as an App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qiconpicker
```

#### Uninstall

To remove as an App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qiconpicker
```

#### Describe
When installed as an App Extension, you can use `quasar describe QIconPicker`
:::

**OR**:

:::
Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

Vue.use(Plugin)
```
:::

**OR**:

:::
```html
<style src="@quasar/quasar-ui-qiconpicker/dist/index.css"></style>

<script>
import { Component as QIconPicker } from '@quasar/quasar-ui-qiconpicker'

export default {
  components: {
    QIconPicker
  }
}
</script>
```
:::

### Caching

If you are using a large icon set and find it is taking too long to load, you can pre-cache the UMD variant.

You can do this by adding to your **App.vue** (or, any other appropriate) file:

:::
```html
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/eva-icons.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/fontawesome-v5.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/ionicons-v4.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons-outlined.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons-round.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons-sharp.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/mdi-v4.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/themify.umd.js'
export default {
  name: 'App'
}
</script>

<style>
</style>
```
:::

Don't add them all (unless you have this requirement). Remove the ones from above you won't be needing.

## Vue CLI project

:::
```js
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

Vue.use(Plugin)
```
:::

**OR**:

:::
```html
<style src="@quasar/quasar-ui-qiconpicker/dist/index.css"></style>

<script>
import { Component as QIconPicker } from '@quasar/quasar-ui-qiconpicker'

export default {
  components: {
    QIconPicker
  }
}
</script>
```
:::

## UMD variant

Exports `window.QCalendar`.

Add the following tag(s) after the Quasar ones:

:::
```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.umd.min.js"></script>
</body>
```
If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):
```html
<link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.rtl.min.css" rel="stylesheet" type="text/css">
```
:::

For **UMD** variants only, there is also a caveat:

You must **also** load the QIconPicker icon set for the icon font(s) that you have loaded:

```html
<script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons.umd.js"></script>
```

Choices are:
1. eva-icons.umd.js
2. fontawesome-v5.umd.js
3. ionicons-v4.umd.js
4. material-icons-outlined.umd.js
5. material-icons-round.umd.js
6. material-icons-sharp.umd.js
7. material-icons.umd.js
8. mdi-v4-outlined.umd.js
9. themify.umd.js


[UMD Example on Codepen](https://codepen.io/Hawkeye64/pen/vYYYewG)

# Docs
Can be found [here](https://quasarframework.github.io/quasar-ui-qiconpicker).

# Examples
Can be found [here](https://quasarframework.github.io/quasar-ui-qiconpicker/examples).

# Interactive Demo
Can be found [here](https://quasarframework.github.io/quasar-ui-qiconpicker/demo).

# Demo (source) Project
Can be found [here](https://github.com/quasarframework/quasar-ui-qiconpicker/tree/master/demo).


# Working with QIconPicker

QIconPicker will work with any of the defined [Quasar Icon Sets](https://quasar.dev/options/quasar-icon-sets). However, for this to work properly, you must make sure the icon set is included in your `quasar.conf.js > extras`.

::: warning
Most icon sets are very large which may cause performance issues.
:::

::: tip
In order to work properly, QIconPicker needs a specified height in it's style (or parent style).
:::
