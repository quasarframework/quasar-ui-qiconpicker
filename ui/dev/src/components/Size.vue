<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="data.value"
        icon-set="material-icons"
        font-size="30px"
        v-model:model-pagination="data.pagination"
        style="height: 360px;"
      ></q-icon-picker>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const data = ref({
      value: '',
      pagination: {
        itemsPerPage: 32,
        page: 0
      }
    })

    return {
      data
    }
  }
})
</script>
