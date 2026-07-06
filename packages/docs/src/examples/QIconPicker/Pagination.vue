<template>
  <div class="row justify-center q-ma-md">
    <div style="width: min(560px, 100%)">
      <q-select
        v-model="data.pagination.itemsPerPage"
        :options="data.options"
        label="Items Per Page"
        class="q-ma-sm col-4"
      />
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
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
  pagination: {
    itemsPerPage: 48,
    page: 1,
  },
  options: [24, 36, 48, 60],
})
</script>
