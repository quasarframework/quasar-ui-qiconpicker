<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 560px">
      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        :icons="icons"
        color="blue-grey-10"
        selected-color="amber-8"
        selected-text-color="blue-grey-10"
        tooltips
        style="height: 220px"
      />

      <div class="q-mt-md text-center">
        Selected SVG icon: <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'InlineSvgCustomIcons' })

const value = ref('')
const pagination = ref({
  itemsPerPage: 6,
  page: 1,
})

const icons = [
  {
    name: 'custom-home',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    name: 'custom-search',
    icon: 'M9.5 3a6.5 6.5 0 0 1 5.18 10.43l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 9.5 3m0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z',
  },
  {
    name: 'custom-star',
    icon: 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  },
  {
    name: 'custom-bolt',
    icon: 'M7 2v11h3v9l7-12h-4l4-8z',
  },
  {
    name: 'custom-calendar',
    icon: 'M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3zm13 8H4v10h16z',
  },
  {
    name: 'custom-palette',
    icon: 'M12 3a9 9 0 0 0 0 18h1.5a1.5 1.5 0 0 0 1.06-2.56A1.5 1.5 0 0 1 15.62 16H18a6 6 0 0 0 0-12zm-5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3',
  },
  {
    name: 'custom-code',
    icon: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z',
  },
  {
    name: 'custom-shield',
    icon: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm0 2.18 7 3.11V11c0 4.52-2.98 8.75-7 9.86-4.02-1.11-7-5.34-7-9.86V6.29z',
  },
  {
    name: 'custom-heart',
    icon: 'M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z',
  },
]
</script>
