<template>
  <div class="row justify-center q-ma-md">
    <div class="keyboard-demo">
      <div class="text-caption text-grey-7 q-mb-sm">
        Click or tab into the picker, then press <kbd>PageDown</kbd> or <kbd>PageUp</kbd> to change
        pages.
      </div>

      <div
        ref="surfaceRef"
        class="keyboard-demo__surface"
        tabindex="0"
        @click="focusSurface"
        @keydown="onKeydown"
      >
        <q-icon-picker
          ref="pickerRef"
          v-model="value"
          v-model:model-pagination="pagination"
          icon-set="material-icons"
          selected-color="indigo-7"
          selected-text-color="white"
          :pagination-props="{
            maxPages: 5,
            directionLinks: true,
            boundaryLinks: true,
            color: 'indigo-7',
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
import { nextTick, ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'KeyboardPagination' })

type QIconPickerPublic = InstanceType<typeof QIconPicker> & {
  nextPage: () => void
  prevPage: () => void
}

const value = ref('')
const surfaceRef = ref<HTMLElement>()
const pickerRef = ref<QIconPickerPublic>()
const pagination = ref({
  itemsPerPage: 48,
  page: 1,
  totalPages: 1,
})

function focusSurface() {
  surfaceRef.value?.focus({ preventScroll: true })
}

async function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'PageDown' && event.key !== 'PageUp') {
    return
  }

  event.preventDefault()

  if (event.key === 'PageDown') {
    pickerRef.value?.nextPage()
  } else {
    pickerRef.value?.prevPage()
  }

  // Changing pages replaces the focused icon button. Restore focus to the
  // wrapper so repeated PageDown/PageUp keystrokes keep driving the picker.
  await nextTick()
  focusSurface()
}
</script>

<style scoped>
.keyboard-demo {
  width: min(620px, 100%);
}

.keyboard-demo__surface {
  outline: 0;
}

.keyboard-demo__surface:focus {
  border-radius: 4px;
  box-shadow: 0 0 0 2px var(--brand-primary, currentColor);
}
</style>
