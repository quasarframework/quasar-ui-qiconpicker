import { boot } from 'quasar/wrappers'
import VuePlugin from '@quasar/quasar-ui-qiconpicker'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
