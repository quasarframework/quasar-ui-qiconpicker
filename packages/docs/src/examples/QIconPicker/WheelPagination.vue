<template>
  <div class="row justify-center q-ma-md">
    <div class="wheel-demo">
      <div class="text-caption text-grey-7 q-mb-sm">
        Hover the picker and use the mouse wheel or trackpad to change pages.
      </div>

      <div class="wheel-demo__surface" tabindex="0" @wheel.prevent="onWheel">
        <q-icon-picker
          ref="pickerRef"
          v-model="value"
          v-model:model-pagination="pagination"
          icon-set="material-icons"
          selected-color="deep-purple-7"
          selected-text-color="white"
          :pagination-props="{
            maxPages: 5,
            directionLinks: true,
            boundaryLinks: true,
            color: 'deep-purple-7',
          }"
          style="height: 240px"
        />
      </div>

      <div class="q-mt-md text-center">
        Page {{ pagination.page }} of {{ pagination.totalPages || 1 }} · Selected:
        <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'WheelPagination' })

type QIconPickerPublic = InstanceType<typeof QIconPicker> & {
  nextPage: () => void
  prevPage: () => void
}

const value = ref('')
const pickerRef = ref<QIconPickerPublic>()
const pagination = ref({
  itemsPerPage: 48,
  page: 1,
  totalPages: 1,
})

function onWheel(event: WheelEvent) {
  if (event.deltaY > 0) {
    pickerRef.value?.nextPage()
  } else if (event.deltaY < 0) {
    pickerRef.value?.prevPage()
  }
}
</script>

<style scoped>
.wheel-demo {
  width: min(620px, 100%);
}

.wheel-demo__surface {
  outline: 0;
}

.wheel-demo__surface:focus-visible {
  border-radius: 4px;
  box-shadow: 0 0 0 2px var(--brand-primary, currentColor);
}
</style>
