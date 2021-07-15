<template>
  <div style="max-width: 800px; width: 100%;">
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      style="height: 360px;"
      :pagination="pageSettings"
      class="test1"
      selected-color="#000"
      selected-background-color="#21BA45"
      animated
      :pagination-props="{
          maxPages: 5,
          input: true,
          color: '#21BA45'
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
      itemsPerPage: 32,
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

<style>
.test1 {
  color: #0aff00;
  background-color: #25577d;
  font-size: 30px;
}

</style>
