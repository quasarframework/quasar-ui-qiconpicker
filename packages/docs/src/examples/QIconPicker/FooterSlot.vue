<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px">
      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        :icons="icons"
        selected-color="teal-7"
        style="height: 260px"
      >
        <template #footer="{ page, totalPages }">
          <div class="footer-slot row items-center justify-between q-pa-sm full-width q-gutter-sm">
            <div class="row items-center q-gutter-sm">
              <q-icon :name="value || 'help_outline'" size="sm" />
              <code>{{ value || 'Choose an icon' }}</code>
            </div>

            <q-pagination
              :model-value="page"
              :max="totalPages"
              dense
              input
              color="teal-7"
              @update:model-value="pagination.page = $event"
            />

            <q-btn
              flat
              dense
              color="negative"
              label="Clear"
              :disable="!value"
              @click="value = ''"
            />
          </div>
        </template>
      </q-icon-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'FooterSlot' })

const value = ref('')
const pagination = ref({
  itemsPerPage: 10,
  page: 1,
})
const icons = [
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
]
</script>

<style lang="scss" scoped>
.footer-slot {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

:global(body.body--dark) .footer-slot {
  border-top-color: rgba(255, 255, 255, 0.18);
}
</style>
