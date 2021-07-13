<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-input
        v-model="filter"
        label="Filter"
        outlined
        clearable
        class="q-ma-md">
      </q-input>
      <q-icon-picker
        v-model="value"
        icon-set="material-icons"
        :filter="filter"
        :pagination.sync="pagination"
        style="height: 220px"
      ></q-icon-picker>
    </div>
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
