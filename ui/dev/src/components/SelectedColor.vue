<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="data.value"
        icon-set="material-icons"
        selected-color="#4E3D42"
        selected-background-color="#C9D5B5"
        :pagination="data.pagination"
        @update:pagination="data.pagination = $event"
        style="height: 220px;"
      ></q-icon-picker>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue';

export default defineComponent({
  setup() {
    const data = ref({
      value: '',
      pagination: {
        itemsPerPage: 60,
        page: 0
      }
    })

    return {
      data
    }
  }
})
</script>
