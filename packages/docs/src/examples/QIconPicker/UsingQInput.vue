<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <q-input v-model="data.value" label="Icon" clearable>
        <template #append>
          <q-icon name="extension" class="cursor-pointer">
            <q-popup-proxy v-model="data.showIconPicker">
              <q-icon-picker
                v-model="data.value"
                v-model:model-pagination="data.pagination"
                :icons="data.icons"
                tooltips
                class="pop-up"
              />
            </q-popup-proxy>
          </q-icon>
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
  icons: [
    { name: 'add' },
    { name: 'alarm' },
    { name: 'anchor' },
    { name: 'apps' },
    { name: 'archive' },
    { name: 'bolt' },
    { name: 'brush' },
    { name: 'build' },
    { name: 'camera_alt' },
    { name: 'check_circle' },
    { name: 'cloud' },
    { name: 'code' },
    { name: 'dashboard' },
    { name: 'delete' },
    { name: 'edit' },
    { name: 'favorite' },
  ],
  pagination: {
    itemsPerPage: 35,
    page: 0,
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
  width: 300px;
}
</style>
