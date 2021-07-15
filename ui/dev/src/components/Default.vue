<template>
  <div style="max-width: 800px; width: 100%;" class="flex flex-center">
    <q-icon-picker
      ref="pagingRef"
      v-model="value"
      icon-set="material-icons"
      style="height: 360px;"
      :pagination="pageSettings"
      class="test1"
      selected-color="#000"
      selected-background-color="#21BA45"
      animated
      :pagination-props="{
          maxPages: 5,
          input: true,
          color: '#21BA45'
        }"
      @update:pagination="pageSettings = $event"
    ></q-icon-picker>


    <q-btn-group push >
      <q-btn push color="white" :disable="(pagingRef) ? pagingRef.isFirstPage :  true" @click="pagingRef.firstPage()" text-color="black" label="First" icon="first_page" />
      <q-btn push color="white" :disable="(pagingRef) ? pagingRef.isFirstPage :  true" @click="pagingRef.prevPage()" text-color="black" icon="navigate_before"/>
      <q-btn push color="white" :disable="(pagingRef) ? pagingRef.isLastPage :  true" @click="pagingRef.nextPage()" text-color="black"  icon="navigate_next"/>
      <q-btn push color="white" :disable="(pagingRef) ? pagingRef.isLastPage :  true" @click="pagingRef.lastPage()" text-color="black" icon="last_page" label="Last"/>
    </q-btn-group>
  </div>

</template>

<script>
import {defineComponent, ref, onBeforeMount, onMounted, computed} from 'vue';

export default defineComponent({
  name: 'Default',
  setup() {
    const pageSettings = ref({
      itemsPerPage: 32,
      page: 0
    })

    const value = ref('')
    const pagingRef = ref(null)

    return {
      pagingRef,
      pageSettings,
      value
    }
  }
})
</script>

<style>
.test1 {
  color: #0aff00;
  background-color: #25577d;
  font-size: 30px;
}

</style>
