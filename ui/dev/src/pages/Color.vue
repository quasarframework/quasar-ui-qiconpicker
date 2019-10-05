<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="value"
        icon-set="material-icons"
        color="green-8"
        background-color="yellow-8"
        :pagination.sync="pagination"
        style="height: 220px;"
      ></q-icon-picker>
    </div>
  </div>
</template>

<script src="dist/icon-set/material-icons.umd.js"></script>
<script>

export default {
  data () {
    return {
      value: '',
      pagination: {
        itemsPerPage: 60,
        page: 0
      }
    }
  },
  mounted () {
    console.log(window)
  }
}
</script>
