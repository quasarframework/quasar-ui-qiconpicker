<template>
  <q-page padding>
    <div class="q-pa-lg flex flex-center">
      <div style="width: 700px;">
        <q-input
          filled
          v-model="data.paginationColor"
          label="Pagination Color"
          hint="Enter colors only from the Quasar color palette (ex: 'orange-8')"
          class="q-mb-md"
        >
        </q-input>
        <q-separator></q-separator>
        <q-icon-picker
          v-model="data.value"
          icon-set="material-icons"
          v-model:model-pagination="data.pagination"
          :paginationProps="{
            maxPages: 5,
            input: true,
            color: data.paginationColor
          }"
          style="height: 220px;"
        ></q-icon-picker>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const data = ref({
      value: '',
      paginationColor: 'orange-10',
      pagination: {
        itemsPerPage: 60,
        page: 0,
      }
    })

    return {
      data
    }
  }
})
</script>
