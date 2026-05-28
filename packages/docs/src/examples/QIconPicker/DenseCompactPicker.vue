<template>
  <div class="row justify-center q-ma-md">
    <div class="compact-demo">
      <q-input v-model="value" dense outlined clearable label="Compact picker" class="q-mb-sm">
        <template #append>
          <q-icon name="apps" class="cursor-pointer">
            <q-popup-proxy v-model="showPicker" cover>
              <q-icon-picker
                v-model="value"
                :icons="icons"
                dense
                no-footer
                selected-color="cyan-8"
                size="sm"
                style="height: 180px; width: 280px"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <div class="text-caption text-grey-7">
        Designed for tight spaces like table filters, cards, dialogs, or mobile controls.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'DenseCompactPicker' })

const value = ref('')
const showPicker = ref(false)

const icons = [
  { name: 'home' },
  { name: 'search' },
  { name: 'favorite' },
  { name: 'settings' },
  { name: 'notifications' },
  { name: 'person' },
  { name: 'mail' },
  { name: 'event' },
  { name: 'task_alt' },
  { name: 'label' },
  { name: 'bookmark' },
  { name: 'dashboard' },
  { name: 'folder' },
  { name: 'image' },
  { name: 'palette' },
  { name: 'code' },
]

watch(value, () => {
  showPicker.value = false
})
</script>

<style scoped>
.compact-demo {
  max-width: 320px;
  width: 100%;
}
</style>
