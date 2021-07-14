<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="value"
        icon-set="material-icons"
        v-model:pagination="pagination"
        style="height: 220px;"
      ></q-icon-picker>
    </div>
  </div>
</template>

<script>
import { defineComponent,reactive } from 'vue';

export default defineComponent({
  name: 'Default',
  setup() {
    const data = reactive({
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
