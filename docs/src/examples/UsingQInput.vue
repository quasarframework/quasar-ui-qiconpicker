<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-input
        v-model="data.value"
        label="Icon"
        clearable
      >
        <template #append>
          <q-icon
            name="extension"
            class="cursor-pointer"
          >
            <q-popup-proxy v-model="data.showIconPicker">
              <q-icon-picker
                v-model="data.value"
                v-model:model-pagination="data.pagination"
                icon-set="material-icons"
                tooltips
                class="pop-up"
              />
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
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      }
    })

    watch(() => data.value.value, () => {
      data.value.showIconPicker = false
    })

    return {
      data
    }
  }
})
</script>

<style scoped>
.pop-up {
  height: 300px;
  width: 300px;
}
</style>
