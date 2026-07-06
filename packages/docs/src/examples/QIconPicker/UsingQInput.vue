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
            >
              <q-icon-picker
                v-model="data.value"
                v-model:model-pagination="data.pagination"
                icon-set="material-icons"
                tooltips
                class="pop-up"
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

defineOptions({ name: 'UsingQInput' })

const data = ref({
  value: '',
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

<style scoped>
.pop-up {
  height: 300px;
  width: min(300px, calc(100vw - 32px));
}
</style>
