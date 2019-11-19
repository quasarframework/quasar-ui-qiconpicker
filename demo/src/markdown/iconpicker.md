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

You can do this by adding to your **App.vue** (or, any other appropriate) file, one or more of the UMD icon-set variants:

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

Exports `window.QIconPicker`.

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

# Codepen
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

# Categories (tags)
Added in **v1.0.7**, you can now get categories (tags) for the associated loaded icon set.

As of this writing, the **Eva** and **Material Design** icon sets are done. The **Fontawesome v5** icon set is partially done. If you need an icon set that **needs** to be completed and is not, PRs are welcomed or DM me on the Discord channel.

You can get the tags viw the `tag` event.

```html
  <q-icon-picker
    v-model="name"
    :filter="filter"
    :icon-set="iconSet"
    :tags="tags"
    font-size="3em"
    tooltips
    :pagination.sync="pagination"
    @tags="onTags"
    style="height: calc(100vh - 140px)"
  />
```

Notice the `@tags="onTags"`. Capturing this is a bit tricky. You need to set a guard to stop potential end-less loop in your Vue code (depending on how you use it). In your `data ()` function set a guard variable; in this case `loaded`:

```js
  data () {
    return {
      loaded: false,  // guard var
      tags: [],       // user selected tags to pass to QIconPicker
      categories: [], // keep track of categories
      selected: {}    // keep track of user selected categories
    }
```

in your `methods` section, add the event handler, and put the guard in to stop potential recursion:

```js
  methods: {
    onTags (tags) {
      if (this.loaded !== true) {
        let cats = []
        let t = [ ...tags ]
        cats.splice(0, 0, ...t)
        this.categories.splice(0, this.categories.length, ...cats)
        this.categories.concat(...cats)
        this.categories.forEach(cat => {
          this.$set(this.selected, cat, false)
        })
        this.loaded = true
      }
    }
  }
```

This is all good and well, until you need to select a different icon-set. We can create the proper handlers in the `watch` section:

```js
  watch: {
    iconSet (val) {
      this.loaded = false
      this.tags.splice(0, this.tags.length)
    },
    filter (val) {
      this.loaded = false
    },
    selected: {
      handler (val) {
        let tags = []
        this.categories.forEach(cat => {
          // if user has selected this tag...
          if (val[cat] === true) {
            // ...then keep track of it
            tags.push(cat)
          }
        })
        // push all user selected tags to QIconPicker
        this.tags.splice(0, this.tags.length, ...tags)
      },
      deep: true
    }
  },
```

Notice in the above code, the ares where the guard is reset with `this.loaded = false`.
