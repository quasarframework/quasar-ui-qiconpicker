QIconPicker
===

> Please note, this is currently a work-in-progress (WIP).

QIconPicker is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction). It allows you to select an icon from a specified [Quasar Icon Set](https://quasar.dev/options/quasar-icon-sets) or pass in an array of objects defining the icons to be displayed.

# Install
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qiconpicker
```
::: tip
In order to work properly, QIconPicker needs a specified height in it's style (or parent style).
:::

# Uninstall
To remove this App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qcalendar
```

# Describe
You can use `quasar describe QIconPicker` (to be implemented before QCalendar v1 release)

# Docs
Can be found [here](https://quasarframework.github.io/app-extension-qiconpicker).

# Examples
Can be found [here](https://quasarframework.github.io/app-extension-qiconpicker/examples).

# Interactive Demo
Can be found [here](https://quasarframework.github.io/app-extension-qiconpicker/demo).

# Demo (source) Project
Can be found [here](https://github.com/quasarframework/app-extension-qiconpicker/tree/master/demo).

# Working with QIconPicker

QIconPicker will work with any of the defined [Quasar Icon Sets](https://quasar.dev/options/quasar-icon-sets). However, for this to work properly, you must make sure the icon set is included in your `quasar.conf.js > extras`.

::: warning
Most icon sets are very large which may cause performance issues.
:::

# QIconPicker API

## Vue Properties

| Vue Property | Type | Description |
| --- | --- | --- |
| value | String | `v-model` data |
| icon-set | String | Acceptable strings are: `material-icons`, `ionicons-v4`, `mdi-v3`, `fontawesome-v5`, `eva-icons`, and `themify` |
| icons | Array | Dat should look like this: `[ { name="extension" }, ... ]` |
| filter | String | Icons will be filtered by the passed string |
| dense | Boolean | Dense mode |
| tooltips | Boolan | Show tooltips |
| color | String | This can be any CSS color value or Quasar color |
| background-color | String | This can be any CSS color value or Quasar color |
| selected-color | String | This can be any CSS color value or Quasar color |
| selected-background-color | String | This can be any CSS color value or Quasar color |
| font-size | String | The font-size to use for the icons. Any acceptable CSS size can be used.<br>Examples: 1.85rem, 30px |

All colors can be from the [Quasar Color Pallete](https://quasar.dev/style/color-palette) or a CSS color (#, rgb, rgba, hls, etc).


## Vue Events
| Vue Event | Args | Description |
| --- | --- | --- |
| input | - | v-model syncronization |

## Vue Slots
| Vue Method | Data | Description |
| --- | --- | --- |
| icon | String (icon name) | Change the way the icon data is displayed |

