/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import { defineIndexScript } from '@quasar/app-vite'

export default defineIndexScript((api) => {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app-vite', '>=3.0.0-beta.19')
  api.compatibleWith('@quasar/extras', '>=1.18.0')

  api.registerDescribeApi('QIconPicker', '~@quasar/quasar-ui-qiconpicker/dist/api/QIconPicker.json')

  api.extendQuasarConf(() => ({
    boot: ['~@quasar/quasar-app-extension-qiconpicker/src/boot/vite-register.ts'],
    css: ['~@quasar/quasar-ui-qiconpicker/src/index.scss'],
  }))
})
