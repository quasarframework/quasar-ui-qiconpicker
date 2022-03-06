<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="data.value"
        v-model:model-pagination="data.pagination"
        icon-set="material-icons"
        size="30px"
        style="height: 360px;"
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
