<template>
  <div style="max-width: 800px; width: 100%;">
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      selected-color="green-8"
      selected-background-color="yellow-8"
      :pagination.sync="pagination"
      style="height: 220px;"
    />
  </div>
</template>

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
  }
}
</script>
