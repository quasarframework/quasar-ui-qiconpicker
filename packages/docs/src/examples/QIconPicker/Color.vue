<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        :icons="data.icons"
        text-color="green-8"
        color="yellow-8"
        style="height: 220px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'Color' })

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
    { name: 'camera_alt' },
    { name: 'check_circle' },
    { name: 'cloud' },
    { name: 'code' },
    { name: 'dashboard' },
    { name: 'delete' },
    { name: 'edit' },
    { name: 'favorite' },
  ],
  pagination: {
    itemsPerPage: 8,
    page: 1,
  },
})
</script>
