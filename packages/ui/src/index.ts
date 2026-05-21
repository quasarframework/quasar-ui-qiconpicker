import type { App } from 'vue'
import QIconPicker from './components/QIconPicker'

import { version } from './version'

function install(app: App): void {
  app.component(String(QIconPicker.name), QIconPicker)
}

export { version, QIconPicker, install }

export default {
  version,
  QIconPicker,
  install,
}
