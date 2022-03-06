import QIconPicker from './components/QIconPicker'

import { version } from './version'

export {
  version,
  QIconPicker
}

export default {
  version,
  QIconPicker,

  install (Vue) {
    Vue.component(QIconPicker.name, QIconPicker)
  }
}
