<template>
  <div class="q-ma-md">
    <q-input v-model="value" label="Icon" clearable>
      <template v-slot:append>
        <q-icon name="extension" class="cursor-pointer">
          <q-popup-proxy v-model="showIconPicker">

            <q-icon-picker
              v-model="value"
              :filter="value"
              icon-set="material-icons"
              tooltips
              :pagination.sync="pagination"
              style="height: 300px; width: 300px; background-color: white;"
            />

          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      }
    }
  },
  watch: {
    value () {
      this.showIconPicker = false
    }
  }
}
</script>
