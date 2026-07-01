/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import { defineIndexScript } from '#q-app'

export default defineIndexScript((api) => {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app-vite', '>=3.0.0-rc.5')
  api.compatibleWith('@quasar/extras', '>=2.0.0')

  api.registerDescribeApi('QIconPicker', '~@quasar/quasar-ui-qiconpicker/dist/api/QIconPicker.json')

  api.extendQuasarConf(() => ({
    boot: ['~@quasar/quasar-app-extension-qiconpicker/dist/boot/vite-register.js'],
    css: ['~@quasar/quasar-ui-qiconpicker/src/index.scss'],
  }))
})
