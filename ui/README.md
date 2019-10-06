QIconPicker
===

[![npm](https://img.shields.io/npm/v/@quasar/quasar-ui-qiconpicker.svg?label=@quasar/quasar-ui-qiconpicker)](https://www.npmjs.com/package/@quasar/quasar-ui-qiconpicker)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-ui-qiconpicker.svg)](https://www.npmjs.com/package/@quasar/quasar-ui-qiconpicker)

QCalendar is a [Quasar](https://quasar.dev) component. It gives an Icon Picker for your apps.

![QIconPicker](https://raw.githubusercontent.com/quasarframework/quasar-ui-qiconpicker/dev/demo/src/statics/q-icon-picker.png)

# Examples and Documentation
Can be found [here](https://quasarframework.github.io/quasar-ui-qiconpicker)

# Usage

## Quasar CLI project

Install the [App Extension](../app-extension).

**OR**:

Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

Vue.use(Plugin)
```

**OR**:

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

## Vue CLI project

```js
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

Vue.use(Plugin)
```

**OR**:

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

### Caching

If you are using a large icon set and find it is taking too long to load, you can pre-cache the UMD variant.

You can do this by adding to your **App.vue** (or, any other appropriate) file:

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

Don't add them all (unless you have this requirement). Remove the ones from above you won't be needing.

## UMD variant

Exports `window.QIconPicker`.

Add the following tag(s) after the Quasar ones:

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

### UMD Example
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">

    <title>UMD test</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/quasar@^1.0.0/dist/quasar.min.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="q-app">
      <q-layout view="lHh Lpr fff">
        <q-header class="glossy bg-primary">
          <q-toolbar>
            <q-toolbar-title>
              quasar-ui-qiconpicker <span class="text-subtitle2">v{{ version }}</span>
            </q-toolbar-title>

            <div>Quasar v{{ $q.version }}</div>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <div style="width: 700px;">
              <q-input
                v-model="filter"
                label="Filter"
                outlined
                clearable
                class="q-ma-md">
              </q-input>
              <q-icon-picker
                v-model="value"
                icon-set="material-icons"
                :filter="filter"
                :pagination.sync="pagination"
                style="height: 220px"
              ></q-icon-picker>
            </div>
            <ul class="q-mb-lg">
              <li>In /ui, run: "yarn build"</li>
              <li class="text-red">You need to build & refresh page on each change manually.</li>
              <li>Use self-closing tags only!</li>
              <li>Example: &lt;my-component&gt;&lt;/my-component&gt;</li>
            </ul>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/quasar@^1.0.0/dist/quasar.ie.polyfills.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@^2.0.0/dist/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quasar@^1.0.0/dist/quasar.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quasar@^1.0.0/dist/icon-set/material-icons.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/index.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker/dist/icon-set/material-icons.umd.js"></script>


    <script>
      new Vue({
        el: '#q-app',

        data: function () {
          return {
            version: QIconPicker.version,
            value: '',
            filter: '',
            pagination: {
              itemsPerPage: 60,
              page: 0
            }
          }
        }
      })
    </script>
  </body>
</html>
```

[UMD Example on Codepen](https://codepen.io/Hawkeye64/pen/vYYYewG)

# Building the Projects

## Setup

In both the `ui` and `ui/dev` folders:

```bash
$ yarn
```

## Developing

In the `ui` folder

```bash
# start dev in SPA mode
$ yarn dev

# start dev in UMD mode
$ yarn dev:umd

# start dev in SSR mode
$ yarn dev:ssr

# start dev in Cordova iOS mode
$ yarn dev:ios

# start dev in Cordova Android mode
$ yarn dev:android

# start dev in Electron mode
$ yarn dev:electron
```

## Building package
```bash
$ yarn build
```

# Donate
If you appreciate the work that went into this project, please consider [donating to Quasar](https://donate.quasar.dev).

# License
MIT (c) Jeff Galbraith <jeff@quasar.dev>
