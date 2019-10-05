<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-input
        filled
        v-model="paginationColor"
        label="Pagination Color"
        hint="Enter colors only from the Quasar color palette (ex: 'orange-8')"
        class="q-mb-md"
      >
      </q-input>
      <q-separator></q-separator>
      <q-icon-picker
        v-model="value"
        icon-set="material-icons"
        :pagination.sync="pagination"
        :paginationColor="paginationColor"
        style="height: 220px;"
      ></q-icon-picker>
    </div>
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
