<template>
  <div class="row justify-center q-ma-md">
    <div style="width: min(560px, 100%)" class="flex flex-center">
      <q-icon-picker
        ref="qIconPickerRef"
        v-model="value"
        v-model:model-pagination="pagination"
        icon-set="material-icons"
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
          aria-label="Previous page"
          @click="qIconPickerRef.prevPage()"
        />
        <q-btn
          push
          color="white"
          :disable="qIconPickerRef ? qIconPickerRef.isLastPage : true"
          text-color="black"
          icon="navigate_next"
          aria-label="Next page"
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
  itemsPerPage: 50,
  page: 1,
})

const value = ref('')
const qIconPickerRef = ref()
</script>
