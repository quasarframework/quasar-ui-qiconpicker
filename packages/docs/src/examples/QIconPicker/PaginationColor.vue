<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: min(560px, 100%)">
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
        icon-set="material-icons"
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
  pagination: {
    itemsPerPage: 48,
    page: 1,
  },
})
</script>
