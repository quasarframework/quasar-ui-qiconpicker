---
title: Installation Types
desc: How to install QIconPicker
keys: All about QIconPicker
related:
  - /all-about-qiconpicker/what-is-qiconpicker
  - /contributing/bugs-and-feature-requests
  - /contributing/sponsor
---
## QIconPicker

### App Extension

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


### Or Create and register a boot file:
```
$ yarn add @quasar/quasar-ui-qiconpicker
# or
$ npm install @quasar/quasar-ui-qiconpicker
```
Then

```js
import { boot } from 'quasar/wrappers'
import Plugin from '@quasar/quasar-ui-qiconpicker'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

export default boot(({ app }) => {
  app.use(Plugin)
})
```


or from sources


```html
import { boot } from 'quasar/wrappers'
import Plugin from '@quasar/quasar-ui-qiconpicker/src/index.js'

export default boot(({ app }) => {
app.use(Plugin)
})
```

Additionally, because you are accessing the sources this way, you will need to make sure your project will transpile the code.

In `quasar.conf.js` update the following:
```js
// Note: using ~ tells Quasar the file resides in node_modules
css: [
  'app.sass',
  '~quasar-ui-qiconpicker/src/index.sass'
],

build: {
  transpile = true,
  transpileDependencies: [
    /quasar-ui-qiconpicker[\\/]src/
  ]
}
```

### Or target as a component import

:::
```html
<style src="@quasar/quasar-ui-qoverlay/dist/QOverlay.min.css"></style>

<script>
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker/dist/index.esm.js'

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
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/mdi-v5.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/themify.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/lineawesome.umd.js'
import '@quasar/quasar-ui-qiconpicker/dist/icon-set/bootstrap-icons.umd.js'
export default {
  name: 'App'
}
</script>

<style>
</style>
```


Don't add them all (unless you have this requirement). Remove the ones from above you won't be needing.

## Vue CLI or Vite
### Vue project from src

:::
```js
import App from './App.vue'
import Plugin from '@quasar/quasar-ui-qiconpicker/src/index.js'
import '@quasar/quasar-ui-qiconpicker/src/index.css'

const app = createApp(App).use(Plugin)
```
:::

### Vue project from dist

:::
```js
import App from './App.vue'
import Plugin from '@quasar/quasar-ui-qiconpicker/dist/index.js'
import '@quasar/quasar-ui-qiconpicker/dist/index.css'

const app = createApp(App).use(Plugin)
```
:::



### Or component import

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


## UMD variant

Exports `window.QIconPicker`.

### Quasar install
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
8. mdi-v4.umd.js
9. mdi-v5.umd.js
10. themify.umd.js
11. line-awesome.umd.js
12. bootstrap-icons.umd.js

``` warning
You can only use one of `mdi-v4` or `mdi-v5`
```

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

You can get the tags with the `tag` event.

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
    const loaded = ref(false) // guard var
    const tags = ref([]) // user selected tags to pass to QIconPicker
    const selected = ref({}) // keep track of categories
    const categories = ref([]) // keep track of user selected categories
```

in your `methods` section, add the event handler, and put the guard in to stop potential recursion:

```js

    function onTags (tags) {
      if (loaded.value !== true) {
        let cats = []
        let t = [ ...tags ]
        cats.splice(0, 0, ...t)
        categories.value.splice(0, categories.value.length, ...cats)
        categories.value.concat(...cats)
        categories.value.forEach(cat => {
            if(cat === selected.value) {
                cat = false
            }
        })
        this.loaded = true
      }
    }
  }
```

This is all good and well, until you need to select a different icon-set. We can create the proper handlers in the `watch` section:

```js

    watch(() => iconSet, (val) => {
      loaded.value = false
      tags.value.splice(0, tags.value.length)
    })

    watch(() => selected, (val) => {
      let tags = []
      categories.value.forEach(cat => {
        // if user has selected this tag...
        if (val[cat] === true) {
          // ...then keep track of it
          tags.push(cat)
        }
      })
      // push all user selected tags to QIconPicker
      tags.value.splice(0, tags.value.length, ...tags)
    }, { deep: true })
```

Notice in the above code, the areas where the guard is reset with `this.loaded = false`.

You can see how this is handled on the **Icons** page. Remember, not all icon sets have been completed and PRs are very much welcomed.
