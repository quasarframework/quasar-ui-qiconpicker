<template>
  <div>
    <div class="row justify-center q-ma-md">
      <p class="text-caption">Enter colors only from the Quasar color palette (ex: "orange-8")</p>
    </div>
    <div class="row justify-center q-gutter-sm q-mb-md">
      <q-input filled v-model="paginationColor" label="Pagination Color" />
    </div>
    <q-separator />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :pagination.sync="pagination"
      :paginationColor="paginationColor"
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
