<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <q-icon-picker v-model="data.value" :icons="data.icons" style="height: 100px" tooltips />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'CustomIconSet' })

const data = ref({
  value: '',
  icons: [
    { name: 'camera_alt' },
    { name: 'photo_camera' },
    { name: 'videocam' },
    { name: 'image' },
    { name: 'collections' },
    { name: 'filter_vintage' },
    { name: 'landscape' },
    { name: 'movie' },
    { name: 'palette' },
    { name: 'photo_library' },
    { name: 'flash_on' },
    { name: 'auto_awesome' },
  ],
  pagination: {
    itemsPerPage: 8,
    page: 1,
  },
})
</script>
