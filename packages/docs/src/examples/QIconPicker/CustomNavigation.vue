<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px" class="flex flex-center">
      <q-icon-picker
        ref="qIconPickerRef"
        v-model="value"
        v-model:model-pagination="pagination"
        :icons="icons"
        selected-color="yellow-8"
        selected-text-color="red-8"
        no-footer
        style="height: 220px"
      />
      <q-btn-group push>
        <q-btn
          push
          color="white"
          :disable="qIconPickerRef ? qIconPickerRef.isFirstPage : true"
          text-color="black"
          label="First"
          icon="first_page"
          @click="qIconPickerRef.firstPage()"
        />
        <q-btn
          push
          color="white"
          :disable="qIconPickerRef ? qIconPickerRef.isFirstPage : true"
          text-color="black"
          icon="navigate_before"
          @click="qIconPickerRef.prevPage()"
        />
        <q-btn
          push
          color="white"
          :disable="qIconPickerRef ? qIconPickerRef.isLastPage : true"
          text-color="black"
          icon="navigate_next"
          @click="qIconPickerRef.nextPage()"
        />
        <q-btn
          push
          color="white"
          :disable="qIconPickerRef ? qIconPickerRef.isLastPage : true"
          text-color="black"
          icon="last_page"
          label="Last"
          @click="qIconPickerRef.lastPage()"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'CustomNavigation' })

const pagination = ref({
  itemsPerPage: 60,
  page: 0,
})

const value = ref('')
const qIconPickerRef = ref()
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
