<template>
  <div>
    <q-markdown class="q-ma-md">
`QPagination` is used for the pagination. You can pass it any of it's props via the `pagination-props` property.

Enter colors only from the Quasar color palette (ex: "orange-8")

    </q-markdown>
    <div class="row justify-start q-ma-md">
      <q-input filled v-model="paginationColor" label="Pagination Color" />
    </div>
    <q-separator />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :pagination.sync="pagination"
      :paginationProps="{
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
