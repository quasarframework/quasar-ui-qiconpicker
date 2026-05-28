<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <q-input v-model="data.filter" label="Filter" outlined clearable class="q-ma-md" />
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        :icons="data.icons"
        :filter="data.filter"
        style="height: 220px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'Filter2' })

const data = ref({
  value: '',
  filter: '',
  icons: [
    { name: 'add' },
    { name: 'alarm' },
    { name: 'anchor' },
    { name: 'apps' },
    { name: 'archive' },
    { name: 'bolt' },
    { name: 'brush' },
    { name: 'build' },
    { name: 'calendar_today' },
    { name: 'camera_alt' },
    { name: 'chat' },
    { name: 'check_circle' },
    { name: 'cloud' },
    { name: 'code' },
    { name: 'dashboard' },
    { name: 'delete' },
    { name: 'edit' },
    { name: 'email' },
    { name: 'favorite' },
    { name: 'home' },
    { name: 'image' },
    { name: 'map' },
    { name: 'notifications' },
    { name: 'palette' },
    { name: 'person' },
    { name: 'photo_camera' },
    { name: 'search' },
    { name: 'settings' },
    { name: 'star' },
    { name: 'visibility' },
  ],
  pagination: {
    itemsPerPage: 8,
    page: 1,
  },
})
</script>
