/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendQuasarConf = function (conf) {
  // make sure qiconpicker boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qiconpicker/src/boot/qiconpicker.js')
  console.log(` App Extension (qiconpicker) Info: 'Adding qiconpicker boot reference to your quasar.conf.js'`)

  // make sure boot file transpiles
  conf.build.transpileDependencies.push(/quasar-app-extension-qiconpicker[\\/]src/)

  // make sure qiconpicker css goes through webpack to avoid ssr issues
  conf.css.push('~@quasar/quasar-app-extension-qiconpicker/src/component/icon-picker.styl')
  console.log(` App Extension (qiconpicker) Info: 'Adding icon-picker.styl css reference to your quasar.conf.js'`)
}

module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0')

  // register JSON api
  api.registerDescribeApi('QIconPicker', './component/QIconPicker.json')

  // extend quasar.conf
  api.extendQuasarConf(extendQuasarConf)
}
