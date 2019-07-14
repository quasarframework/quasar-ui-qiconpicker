<template>
  <q-icon-picker
    v-model="value"
    icon-set="material-icons"
    tooltips
    :pagination.sync="pagination"
    style="height: 220px;"
  />
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
