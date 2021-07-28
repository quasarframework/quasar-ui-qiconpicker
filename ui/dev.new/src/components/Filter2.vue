<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-input
        v-model="data.filter"
        label="Filter"
        outlined
        clearable
        class="q-ma-md">
      </q-input>
      <q-icon-picker
        v-model="data.value"
        icon-set="material-icons"
        :filter="data.filter"
        style="height: 220px"
        v-model:model-pagination="data.pagination"
      ></q-icon-picker>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  setup() {
    const data = ref({
      value: '',
      filter: '',
      pagination: {
        itemsPerPage: 60,
        page: 0
      }
    })

    return {
      data
    }
  }
})
</script>
