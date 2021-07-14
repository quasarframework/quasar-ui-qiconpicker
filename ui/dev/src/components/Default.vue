<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-icon-picker
        v-model="value"
        icon-set="material-icons"
        style="height: 220px;"
        :pagination="pageSettings"
        @update:pagination="pageSettings = $event"
      ></q-icon-picker>
    </div>
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
