<template>
  <div style="max-width: 800px; width: 100%;">
    <q-icon-picker
      v-model="value"
      :icons="icons"
      style="height: 100px;"
      tooltips
    />
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
        itemsPerPage: 10,
        page: 0
      }
    }
  }
}
</script>
