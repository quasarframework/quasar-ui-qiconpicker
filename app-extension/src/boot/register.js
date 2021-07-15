import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-test-ext'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
