<template>
    <div class="q-pa-lg flex flex-center">
      <div style="width: 700px;">
        <q-input v-model="data.value" label="Icon" clearable>
          <template v-slot:append>
            <q-icon name="extension" class="cursor-pointer">
              <q-popup-proxy v-model="data.showIconPicker">
                <q-input
                  v-model="data.filter"
                  label="Filter"
                  outlined
                  clearable
                  dense
                  class="q-ma-md">
                </q-input>

                <q-icon-picker
                  v-model="data.value"
                  :filter="data.filter"
                  icon-set="material-icons"
                  tooltips
                  v-model:model-pagination="data.pagination"
                  style="height: 300px; width: 300px; background-color: white;"
                ></q-icon-picker>

              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
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
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      }
    })

    watch(()=> data.value.value, () =>  {
      data.value.showIconPicker = false
    })

    return {
      data
    }


  }
})
</script>
