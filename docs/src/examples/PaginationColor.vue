<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-input
        v-model="data.paginationColor"
        filled
        label="Pagination Color"
        hint="Enter colors only from the Quasar color palette (ex: 'orange-8')"
        class="q-mb-md"
      />
      <q-separator />
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
        :pagination-props="{
          maxPages: 5,
          input: true,
          color: data.paginationColor
        }"
        style="height: 220px;"
      />
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
