<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: min(700px, 100%)">
      <q-input v-model="data.value" label="Icon" clearable>
        <template #append>
          <q-btn dense flat round icon="extension" aria-label="Choose icon">
            <q-menu
              v-model="data.showIconPicker"
              anchor="bottom right"
              self="top right"
              :offset="[0, 8]"
              class="column justify-center items-center"
            >
              <q-input
                v-model="data.filter"
                label="Filter"
                outlined
                clearable
                dense
                class="q-ma-md"
              />

              <q-icon-picker
                v-model="data.value"
                v-model:model-pagination="data.pagination"
                :filter="data.filter"
                icon-set="material-icons"
                tooltips
                style="height: 300px; width: min(300px, calc(100vw - 32px))"
              />
            </q-menu>
          </q-btn>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'UsingQInputWithFilter' })

const data = ref({
  value: '',
  filter: '',
  showIconPicker: false,
  pagination: {
    itemsPerPage: 30,
    page: 1,
  },
})

watch(
  () => data.value.value,
  () => {
    data.value.showIconPicker = false
  },
)
</script>
