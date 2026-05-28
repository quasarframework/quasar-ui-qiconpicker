<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px">
      <q-select
        v-model="data.pagination.itemsPerPage"
        :options="data.options"
        label="Items Per Page"
        class="q-ma-sm col-4"
      />
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        :icons="data.icons"
        style="height: 220px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'Pagination' })

const data = ref({
  value: '',
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
    itemsPerPage: 75,
    page: 0,
  },
  options: [25, 50, 75, 100],
})
</script>
