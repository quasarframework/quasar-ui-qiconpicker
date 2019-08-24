import QIconPicker from '@quasar/quasar-app-extension-qiconpicker/src/component/QIconPicker'
import { Colorize } from 'quasar-mixin-colorize'

export default ({ Vue }) => {
  Vue.component('q-icon-picker', QIconPicker)
  Vue.component(Colorize)
}
