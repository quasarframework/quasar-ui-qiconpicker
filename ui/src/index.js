import QIconPicker from './components/QIconPicker'
import pkg from '../package.json'
const { version } = pkg

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
