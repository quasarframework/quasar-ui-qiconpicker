<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: min(560px, 100%)">
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
        :pagination-props="{
          maxPages: 5,
          color: 'red-8',
          'direction-links': true,
          'boundary-links': true,
          'icon-first': 'skip_previous',
          'icon-last': 'skip_next',
          'icon-prev': 'fast_rewind',
          'icon-next': 'fast_forward',
        }"
        style="height: 220px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'PaginationCustom' })

const data = ref({
  value: '',
  pagination: {
    itemsPerPage: 48,
    page: 1,
  },
})
</script>
