<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px;">
      <q-select
        v-model="data.pagination.itemsPerPage"
        :options="data.options"
        label="Items Per Page"
        class="q-ma-sm col-4"
      />
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
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
      pagination: {
        itemsPerPage: 75,
        page: 0
      },
      options: [ 25, 50, 75, 100 ]
    })

    return {
      data
    }
  }

})
</script>
