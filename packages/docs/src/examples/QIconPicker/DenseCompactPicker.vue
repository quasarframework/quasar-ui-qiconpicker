<template>
  <div class="row justify-center q-ma-md">
    <div class="compact-demo">
      <q-input v-model="value" dense outlined clearable label="Icon" class="compact-input q-mb-sm">
        <template #prepend>
          <q-icon :name="value || 'apps'" />
        </template>

        <template #append>
          <q-icon name="apps" class="cursor-pointer" @click.stop>
            <q-menu
              v-model="showPicker"
              anchor="bottom right"
              self="top right"
              :offset="[0, 8]"
              class="compact-picker-menu"
            >
              <div class="compact-picker-panel">
                <q-input
                  v-model="filter"
                  dense
                  borderless
                  clearable
                  autofocus
                  placeholder="Filter icons"
                  class="compact-filter"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-separator />

                <q-icon-picker
                  v-model="value"
                  icon-set="material-icons"
                  :filter="filter"
                  dense
                  no-footer
                  selected-color="cyan-8"
                  size="sm"
                  class="compact-picker"
                />
              </div>
            </q-menu>
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
const filter = ref('add')
const showPicker = ref(false)

watch(value, () => {
  showPicker.value = false
  filter.value = 'add'
})
</script>

<style scoped>
.compact-demo {
  max-width: 360px;
  width: 100%;
}

.compact-input {
  width: 100%;
}

.compact-picker-panel {
  width: min(320px, calc(100vw - 32px));
  padding: 8px;
}

.compact-filter {
  padding: 0 4px 4px;
}

.compact-picker {
  height: 260px;
  width: 100%;
}

.compact-picker :deep(.q-icon-picker__container) {
  align-content: flex-start;
  justify-content: flex-start;
  padding: 8px;
}
</style>
