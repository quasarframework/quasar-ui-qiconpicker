<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <div class="wrapper">
        <q-icon-picker
          v-model="data.value"
          v-model:model-pagination="data.pagination"
          :icons="data.icons"
          :pagination-props="{
            'max-pages': 5,
            input: true,
            color: 'yellow-10',
            'input-class': 'text-yellow-10',
          }"
          class="container"
          style="height: 400px"
        >
          <template #icon="name">
            <q-btn
              :label="name"
              :icon="name"
              no-caps
              no-wrap
              align="left"
              style="width: 32%"
              class="q-ma-xs ellipsis col-4 icon-item"
            />
          </template>
        </q-icon-picker>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'UsingIconSlot' })

const data = ref({
  value: '',
  icons: [
    { name: 'add' },
    { name: 'alarm' },
    { name: 'anchor' },
    { name: 'apps' },
    { name: 'archive' },
    { name: 'bolt' },
    { name: 'brush' },
    { name: 'build' },
    { name: 'calendar_today' },
    { name: 'camera_alt' },
    { name: 'chat' },
    { name: 'check_circle' },
    { name: 'cloud' },
    { name: 'code' },
    { name: 'dashboard' },
    { name: 'delete' },
    { name: 'edit' },
    { name: 'email' },
    { name: 'favorite' },
    { name: 'home' },
    { name: 'image' },
    { name: 'map' },
    { name: 'notifications' },
    { name: 'palette' },
    { name: 'person' },
    { name: 'photo_camera' },
    { name: 'search' },
    { name: 'settings' },
    { name: 'star' },
    { name: 'visibility' },
  ],
  pagination: {
    itemsPerPage: 24,
    page: 0,
  },
})
</script>
<style lang="scss">
.wrapper {
  background: linear-gradient(#3d4246, #24282b);
  border-radius: 4px;
  border-top: 1px solid #53575c;
  border-left: 1px solid #53575c;
  box-shadow:
    1px 1px #17191c,
    0 0 10px #323338;
  padding: 8px;
  padding-bottom: 12px;
}

.container {
  border: 1px solid #0f1014;
  border-radius: 3px;
  background: #0f1014;
}

.icon-item {
  display: table;
  float: left;
  height: 36px;
  max-height: 36px;
  color: #d9d9d9;
  text-align: center;
  text-shadow: 0 1px #0f1014;
  background: linear-gradient(#44494f, #2f3237);
  border-radius: 3px;
  border-right: 1px solid #0f1014;
  border-bottom: 1px solid #0f1014;
  border-top: 1px solid #53575c;
  border-left: 1px solid #53575c;
  box-shadow: 1px 1px #17191c;
  cursor: pointer;
}
</style>
