<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <q-input
        v-model="data.paginationColor"
        filled
        label="Pagination Color"
        hint="Enter colors only from the Quasar color palette (ex: 'orange-8')"
        class="q-mb-md"
      />
      <q-separator />
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        :icons="data.icons"
        :pagination-props="{
          maxPages: 5,
          input: true,
          color: data.paginationColor,
        }"
        style="height: 220px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'PaginationColor' })

const data = ref({
  value: '',
  paginationColor: 'orange-10',
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
    itemsPerPage: 10,
    page: 1,
  },
})
</script>
