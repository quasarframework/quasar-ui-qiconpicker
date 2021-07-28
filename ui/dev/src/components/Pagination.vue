<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px;">
      <q-select
        v-model="data.pagination.itemsPerPage"
        :options="data.options"
        label="Items Per Page"
        class="q-ma-sm col-4">
      </q-select>
      <!-- <q-icon-picker
        v-model="data.value"
        icon-set="material-icons"
        v-model:model-pagination="data.pagination"
        style="height: 220px;"
      ></q-icon-picker> -->
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
        itemsPerPage: 75,
        page: 0
      },
      options: [25, 50, 75, 100]
    })

    return {
      data
    }
  }

})
</script>
