<template>
  <div style="max-width: 800px; width: 100%;">
    <div class="row justify-start q-ma-md">
      <q-input filled v-model="paginationColor" label="Pagination Color" />
    </div>
    <q-separator />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :pagination.sync="pagination"
      :pagination-props="{
        maxPages: 5,
        input: true,
        color: paginationColor
      }"
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
      },
      paginationColor: 'orange-10'
    }
  }
}
</script>
