<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="data.value"
        :icons="data.icons"
        style="height: 100px;"
        tooltips
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
      icons: [
        { name: 'camera' },
        { name: 'o_camera' },
        { name: 'r_camera' },
        { name: 's_camera' },
        { name: 'ion-ios-camera' },
        { name: 'fas fa-camera' },
        { name: 'eva-camera' },
        { name: 'mdi-camera' },
        { name: 'ti-camera' },
        { name: 'bi-camera' },
        { name: 'bi-camera2' }
      ],
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
