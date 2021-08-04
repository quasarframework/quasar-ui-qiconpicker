<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { provideMarkdownStore } from 'assets/markdown-store.js'
import getMeta from 'assets/get-meta.js'

export default defineComponent({
  name: 'App',

  setup () {
    useMeta({
      title: 'QIconPicker » simple overlays for your Quasar apps',
      titleTemplate: title => `${ title } » QIconPicker`,

      meta: getMeta(
        'QIconPicker - simple overlays for your Quasar apps',
        'QIconPicker allows simplified overlays for your Quasar apps.'
      )
    })

    provideMarkdownStore()
  }
})
</script>
