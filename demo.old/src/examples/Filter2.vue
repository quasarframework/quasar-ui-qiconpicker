<template>
  <div style="max-width: 800px; width: 100%;">
    <q-input v-model="filter" label="Filter" outlined clearable class="q-ma-md" />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :filter="filter"
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
      filter: '',
      pagination: {
        itemsPerPage: 60,
        page: 0
      }
    }
  }
}
</script>
