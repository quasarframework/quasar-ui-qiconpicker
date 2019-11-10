<template>
  <div>
    <q-markdown class="q-ma-md">
You can use the `pagination` property to control the number of icons displayed at one time. Don't forget to put the `.sync` modifier on the `pagination` property (ie: `:pagination.sync="pagination"`) so the data can flow both ways.

    </q-markdown>
    <div class="row justify-start q-ma-md">
      <q-select v-model="pagination.itemsPerPage" :options="options" label="Items Per Page" class="q-ma-sm col-4" />
    </div>
    <q-separator />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
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
        itemsPerPage: 75,
        page: 0
      },
      options: [ 25, 50, 75, 100 ]
    }
  }
}
</script>
