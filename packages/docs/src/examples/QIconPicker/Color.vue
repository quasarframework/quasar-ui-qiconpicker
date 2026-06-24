<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: min(420px, 100%)">
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
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
  pagination: {
    itemsPerPage: 32,
    page: 1,
  },
})
</script>
