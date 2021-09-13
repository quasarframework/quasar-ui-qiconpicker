<template>
    <div class="q-pa-lg flex flex-center">
      <div style="width: 700px;">
        <q-icon-picker
          v-model="data.value"
          icon-set="material-icons"
          v-model:model-pagination="data.pagination"
          :paginationProps="{
            maxPages: 5,
            color: 'red-8',
            'direction-links': true,
            'boundary-links': true,
            'icon-first': 'skip_previous',
            'icon-last': 'skip_next',
            'icon-prev': 'fast_rewind',
            'icon-next': 'fast_forward'
          }"
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
        page: 0,
      }
    })

    return {
      data
    }
  }
})
</script>
