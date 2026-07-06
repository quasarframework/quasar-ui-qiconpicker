<template>
  <div class="row justify-center q-ma-md">
    <div style="width: min(360px, 100%)">
      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        icon-set="material-icons"
        filter="camera"
        no-footer
        selected-color="cyan-7"
        style="height: 150px"
      />

      <div class="q-mt-md text-center">
        Selected compact action: <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'NoFooter' })

const value = ref('')
const pagination = ref({
  itemsPerPage: 0,
  page: 1,
})
</script>
