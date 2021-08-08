<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px;" class="flex flex-center">
      <q-icon-picker
        ref="qIconPickerRef"
        v-model="value"
        icon-set="material-icons"
        v-model:model-pagination="pagination"
        selected-color="yellow-8"
        selected-text-color="red-8"
        no-footer
        style="height: 220px;"
      ></q-icon-picker>
      <q-btn-group push >
        <q-btn push color="white" :disable="(qIconPickerRef) ? qIconPickerRef.isFirstPage :  true" @click="qIconPickerRef.firstPage()" text-color="black" label="First" icon="first_page" />
        <q-btn push color="white" :disable="(qIconPickerRef) ? qIconPickerRef.isFirstPage :  true" @click="qIconPickerRef.prevPage()" text-color="black" icon="navigate_before"/>
        <q-btn push color="white" :disable="(qIconPickerRef) ? qIconPickerRef.isLastPage :  true" @click="qIconPickerRef.nextPage()" text-color="black"  icon="navigate_next"/>
        <q-btn push color="white" :disable="(qIconPickerRef) ? qIconPickerRef.isLastPage :  true" @click="qIconPickerRef.lastPage()" text-color="black" icon="last_page" label="Last"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker/src/index'
import '@quasar/quasar-ui-qiconpicker/src/index.sass'

export default defineComponent({
  components: {
    QIconPicker
  },
  setup(props, context) {

    const pagination = ref({
      itemsPerPage: 60,
      page: 0,
    })

    const value = ref('')
    const qIconPickerRef = ref()

    return {
      qIconPickerRef,
      pagination,
      value
    }
  }
})
</script>
