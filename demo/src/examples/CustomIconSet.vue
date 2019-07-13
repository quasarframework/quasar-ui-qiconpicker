<template>
  <q-icon-picker
    v-model="value"
    :icons="icons"
    style="height: 100px;"
  />
</template>

<script>
export default {
  data () {
    return {
      value: '',
      icons: [
        { name: 'camera' },
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
