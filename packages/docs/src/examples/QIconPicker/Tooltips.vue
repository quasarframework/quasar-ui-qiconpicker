<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
        tooltips
        style="height: 220px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'Tooltips' })

const data = ref({
  value: '',
  pagination: {
    itemsPerPage: 60,
    page: 0,
  },
})
</script>
