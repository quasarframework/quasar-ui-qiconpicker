<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px;">
      <q-select
        v-model="pagination.itemsPerPage"
        :options="options"
        label="Items Per Page"
        class="q-ma-sm col-4">
      </q-select>
      <q-icon-picker
        v-model="value"
        icon-set="material-icons"
        :pagination.sync="pagination"
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
        itemsPerPage: 75,
        page: 0
      },
      options: [ 25, 50, 75, 100 ]
    }
  }
}
</script>
