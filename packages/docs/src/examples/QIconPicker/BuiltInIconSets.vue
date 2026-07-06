<template>
  <div class="row justify-center q-ma-md">
    <div style="width: min(700px, 100%)">
      <q-select
        v-model="iconSet"
        :options="iconSets"
        label="Icon Set"
        outlined
        dense
        class="q-mb-md"
      />

      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        :icon-set="iconSet"
        tooltips
        style="height: 260px"
      />

      <div class="q-mt-md">
        Selected: <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'BuiltInIconSets' })

const iconSets = [
  'material-icons',
  'material-symbols-outlined',
  'mdi-v7',
  'fontawesome-v7',
  'ionicons-v8',
  'bootstrap-icons',
]

const iconSet = ref('material-icons')
const value = ref('')
const pagination = ref({
  itemsPerPage: 72,
  page: 1,
})

watch(iconSet, () => {
  value.value = ''
})
</script>
