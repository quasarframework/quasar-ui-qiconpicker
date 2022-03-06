<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-input
        v-model="data.filter"
        label="Filter"
        outlined
        clearable
        class="q-ma-md"
      />
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
        :filter="data.filter"
        style="height: 220px"
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
