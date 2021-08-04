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
      title: 'QIconPicker » simple icon picker for your Quasar apps',
      titleTemplate: title => `${ title } » QIconPicker`,

      meta: getMeta(
        'QIconPicker - simple icon picker for your Quasar apps',
        'QIconPicker allows simplified icon picker for your Quasar apps.'
      )
    })

    provideMarkdownStore()
  }
})
</script>
