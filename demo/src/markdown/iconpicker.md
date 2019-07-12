QIconPicker
===

![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20UI%20App%20Extension-blue.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qiconpicker.svg?style=plastic)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-qiconpicker.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-qiconpicker.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qiconpicker.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qiconpicker)

QIconPicker is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction). It allows you to select an icon from a specified [Quasar Icon Set](https://quasar.dev/options/quasar-icon-sets) or pass in an array of objects defining the icons to be displayed.

QIconPicker is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction). It is a powerful component that plugs right into your Quasar application and allows you to have an icon selector embedded in your app.

# Install
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qiconpicker
```

# Uninstall
To remove this App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qiconpicker
```

# Describe
You can use `quasar describe QIconPicker`

# Interactive Demo
Can be found [here](https://quasarframework.github.io/app-extension-qiconpicker/demo).

# Demo Project (source)
Can be found [here](https://github.com/quasarframework/app-extension-qiconpicker/tree/master/demo).

# Working with QIconPicker

QIconPicker will work with any of the defined [Quasar Icon Sets](https://quasar.dev/options/quasar-icon-sets). However, for this to work properly, you must make sure the icon set is included in your `quasar.conf.js > extras`.

::: warning
Most icon sets are very large which may cause performance issues.
:::

::: tip
In order to work properly, QIconPicker needs a specified height in it's style (or parent style).
:::

# QIconPicker API

## Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | String | `v-model` data |
| icon-set | String | Acceptable strings are: `material-icons`, `ionicons-v4`, `mdi-v3`, `fontawesome-v5`, `eva-icons`, and `themify` |
| icons | Array | Data should look like this: `[ { name="icon name" }, ... ]`. Note: the icons used must already be loaded. |
| filter | String | Icons will be filtered by the passed string |
| dense | Boolean | Dense mode |
| tooltips | Boolan | Show tooltips |
| no-footer | Boolan | Set to `true` to hide footer when `pagination` is enabled |
| color | String | This can be any CSS color value or Quasar color |
| background-color | String | This can be any CSS color value or Quasar color |
| selected-color | String | This can be any CSS color value or Quasar color |
| selected-background-color | String | This can be any CSS color value or Quasar color |
| font-size | String | The font-size to use for the icons. Any acceptable CSS size can be used.<br>Examples: 1.85rem, 30px |
| pagination | Object | For pagination purposes. Use `pagination.sync` to synchronize the data.<br>`:pagination.sync="pagination"`<br>Where the object looks like this: `{ page: #, itemsPerPage: #, totalPages: # }`. You can use `page` and `itemsPerPage` to control the pagination. QIconPicker will set `totalPages` depending on `icon-set` or `icons` properties (this is where the `.sync` is needed for two-way binding).<br>If using a `filter` the page will automatically be reset to 1 |

All colors can be from the [Quasar Color Pallete](https://quasar.dev/style/color-palette) or a CSS color (#, rgb, rgba, hls, etc).


## Vue Events
| Vue Event | Args | Description |
| --- | --- | --- |
| input | value | @input -> function(value) syncronization |

## Vue Slots
| Vue Method | Data | Description |
| --- | --- | --- |
| icon | String (icon name) | Change the way the icon data is displayed |

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).

---
This page created with [QMarkdown](https://quasarframework.github.io/app-extension-qmarkdown), another great Quasar App Extension.
