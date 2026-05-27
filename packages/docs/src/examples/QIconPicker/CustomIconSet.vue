<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px">
      <q-icon-picker v-model="data.value" :icons="data.icons" style="height: 100px" tooltips />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'
import { biCamera, biCamera2, biCameraFill } from '@quasar/extras/bootstrap-icons'
import { fasCamera, fasCameraRetro, fasCameraRotate } from '@quasar/extras/fontawesome-v7'
import { matCamera, matCameraAlt, matPhotoCamera } from '@quasar/extras/material-icons'
import { mdiCamera, mdiCameraIris } from '@quasar/extras/mdi-v7'

defineOptions({ name: 'CustomIconSet' })

const data = ref({
  value: '',
  icons: [
    { name: 'material-camera', icon: matCamera },
    { name: 'material-camera-alt', icon: matCameraAlt },
    { name: 'material-photo-camera', icon: matPhotoCamera },
    { name: 'fontawesome-camera', icon: fasCamera },
    { name: 'fontawesome-camera-retro', icon: fasCameraRetro },
    { name: 'fontawesome-camera-rotate', icon: fasCameraRotate },
    { name: 'bootstrap-camera', icon: biCamera },
    { name: 'bootstrap-camera2', icon: biCamera2 },
    { name: 'bootstrap-camera-fill', icon: biCameraFill },
    { name: 'mdi-camera', icon: mdiCamera },
    { name: 'mdi-camera-iris', icon: mdiCameraIris },
  ],
  pagination: {
    itemsPerPage: 60,
    page: 0,
  },
})
</script>
