<template>
  <div style="max-width: 800px; width: 100%;">
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      style="height: 220px;"
      :pagination="pageSettings"

      color="green-8"
      background-color="yellow-8"
      selected-color="green-8"
      selected-background-color="green-2"

      :pagination-props="{
          maxPages: 5,
          input: true,
          color: 'orange-10'
        }"

      @update:pagination="pageSettings = $event"
    ></q-icon-picker>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'Default',
  setup() {
    const pageSettings = ref({
      itemsPerPage: 60,
      page: 0
    })

    const value = ref('')

    return {
      pageSettings,
      value
    }
  }
})
</script>
