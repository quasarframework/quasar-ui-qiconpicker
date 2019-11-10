import { version } from '../package.json'
import Component from './components/QIconPicker'

export {
  version,
  Component
}

export default {
  version,
  Component,

  install (Vue) {
    Vue.component(Component.name, Component)
  }
}
