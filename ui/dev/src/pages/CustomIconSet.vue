<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="value"
        :icons="icons"
        style="height: 100px;"
        tooltips
      ></q-icon-picker>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
        { name: 'ti-camera' }
      ],
      pagination: {
        itemsPerPage: 60,
        page: 0
      }
    }
  }
}
</script>
