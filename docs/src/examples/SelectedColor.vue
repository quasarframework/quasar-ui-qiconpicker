<template>
    <div class="q-pa-lg flex flex-center">
      <div style="width: 700px;">
        <q-icon-picker
          v-model="data.value"
          icon-set="material-icons"
          selected-text-color="red-8"
          selected-color="yellow-8"
          v-model:model-pagination="data.pagination"
          style="height: 220px;"
        ></q-icon-picker>
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
