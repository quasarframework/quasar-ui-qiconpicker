<template>
  <q-page padding>
    <div class="q-pa-lg flex flex-center">
      <div style="width: 700px;">
        <q-icon-picker
          v-model="data.value"
          icon-set="material-icons"
          color="green-8"
          background-color="yellow-8"
          v-model:model-pagination="data.pagination"
          style="height: 220px;"
        ></q-icon-picker>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = ref({
      value: '',
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
