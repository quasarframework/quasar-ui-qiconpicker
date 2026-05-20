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
import { fasCamera, fasCameraRetro, fasCameraRotate } from '@quasar/extras/fontawesome-v6'
import { matCamera, matCameraAlt, matPhotoCamera } from '@quasar/extras/material-icons'
import { mdiCamera, mdiCameraIris } from '@quasar/extras/mdi-v7'

defineOptions({ name: 'CustomIconSet' })

const data = ref({
  value: '',
  icons: [
    { name: 'material-camera', icon: matCamera, tags: ['material'] },
    { name: 'material-camera-alt', icon: matCameraAlt, tags: ['material'] },
    { name: 'material-photo-camera', icon: matPhotoCamera, tags: ['material'] },
    { name: 'fontawesome-camera', icon: fasCamera, tags: ['fontawesome'] },
    { name: 'fontawesome-camera-retro', icon: fasCameraRetro, tags: ['fontawesome'] },
    { name: 'fontawesome-camera-rotate', icon: fasCameraRotate, tags: ['fontawesome'] },
    { name: 'bootstrap-camera', icon: biCamera, tags: ['bootstrap'] },
    { name: 'bootstrap-camera2', icon: biCamera2, tags: ['bootstrap'] },
    { name: 'bootstrap-camera-fill', icon: biCameraFill, tags: ['bootstrap'] },
    { name: 'mdi-camera', icon: mdiCamera, tags: ['mdi'] },
    { name: 'mdi-camera-iris', icon: mdiCameraIris, tags: ['mdi'] },
  ],
  pagination: {
    itemsPerPage: 60,
    page: 0,
  },
})
</script>
