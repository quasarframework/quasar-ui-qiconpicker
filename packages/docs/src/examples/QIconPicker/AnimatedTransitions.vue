<template>
  <div class="row justify-center q-ma-md">
    <div style="width: min(560px, 100%)">
      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        icon-set="material-icons"
        animated
        transition-prev="jump-right"
        transition-next="jump-left"
        selected-color="deep-orange-7"
        selected-text-color="white"
        :pagination-props="{
          maxPages: 4,
          directionLinks: true,
          color: 'deep-orange-7',
        }"
        style="height: 240px"
      />

      <div class="q-mt-md text-center">
        Selected animated icon: <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'AnimatedTransitions' })

const value = ref('')
const pagination = ref({
  itemsPerPage: 48,
  page: 1,
})
</script>
