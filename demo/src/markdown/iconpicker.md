QIconPicker
===

![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20UI%20App%20Extension-blue.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qiconpicker.svg?style=plastic)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-qiconpicker.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-qiconpicker.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qiconpicker.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qiconpicker)

QIconPicker is a [Quasar App Extension](https://quasar.dev/app-extensions/introduction). It allows you to have an icon selector embedded in your app. It uses a [Quasar Icon Set](https://quasar.dev/options/quasar-icon-sets) or you can pass in an array of objects defining the icons to be displayed.

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
