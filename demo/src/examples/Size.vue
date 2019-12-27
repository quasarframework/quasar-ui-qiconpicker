<template>
  <div style="max-width: 800px; width: 100%;">
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      font-size="30px"
      :pagination.sync="pagination"
      style="height: 360px;"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      pagination: {
        itemsPerPage: 32,
        page: 0
      }
    }
  }
}
</script>
