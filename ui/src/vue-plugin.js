import QIconPicker from './components/QIconPicker'

import { version } from './version'

function install (app) {
  app.component(QIconPicker.name, QIconPicker)
}

export {
  version,
  QIconPicker,

  install
}
