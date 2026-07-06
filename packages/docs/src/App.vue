<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from 'quasar'
import { useDark } from '@/.q-press/composables/dark'

import getMeta from '@/.q-press/assets/get-meta'

const { initDark } = useDark()
initDark()

useMeta({
  title: 'QIconPicker for Vue and Quasar',
  titleTemplate: (title) => `${title} | QIconPicker`,

  meta: getMeta(
    'QIconPicker - Icon picker for Vue and Quasar',
    'QIconPicker is a Vue and Quasar component for selecting icons from Quasar icon sets or custom icon collections.',
  ),
})
</script>
