<template>
  <q-page padding>
    <div style="max-width: 800px; width: 100%;" class="flex flex-center">
      <q-icon-picker
        ref="qIconPickerRef"
        v-model="value"
        icon-set="material-icons"
        v-model:model-pagination="pagination"
        selected-color="yellow-8"
        selected-text-color="red-8"
        no-footer
        class="test1"
        style="height: 370px;"
      />
      <q-btn-group push >
        <q-btn push color="white" :disable="(pagingRef ? pagingRef.isFirstPage : true)" @click="pagingRef.firstPage()" text-color="black" label="First" icon="first_page" />
        <q-btn push color="white" :disable="(pagingRef ? pagingRef.isFirstPage : true)" @click="pagingRef.prevPage()" text-color="black" icon="navigate_before"/>
        <q-btn push color="white" :disable="(pagingRef ? pagingRef.isLastPage : true)" @click="pagingRef.nextPage()" text-color="black"  icon="navigate_next"/>
        <q-btn push color="white" :disable="(pagingRef ? pagingRef.isLastPage : true)" @click="pagingRef.lastPage()" text-color="black" icon="last_page" label="Last"/>
      </q-btn-group>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'Default',
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

<style>
.test1 {
  color: #0aff00;
  background-color: #25577d;
}


</style>
