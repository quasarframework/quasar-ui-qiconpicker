<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: min(420px, 100%)">
      <q-icon-picker v-model="data.value" :icons="data.icons" style="height: 120px" tooltips />
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
})
</script>
