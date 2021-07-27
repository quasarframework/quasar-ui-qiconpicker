import QIconPicker from './components/QIconPicker'

const version = __UI_VERSION__

function install (app) {
  app.component(QIconPicker.name, QIconPicker)
}

export {
  version,
  QIconPicker,

  install
}
