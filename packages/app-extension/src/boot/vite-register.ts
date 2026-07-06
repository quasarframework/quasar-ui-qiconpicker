import { defineBoot } from '#q-app'
import VuePlugin from '@quasar/quasar-ui-qiconpicker'

export default defineBoot(({ app }) => {
  app.use(VuePlugin)
})
