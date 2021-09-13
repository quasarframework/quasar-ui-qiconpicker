<template>
  <json-api-viewer
    title="QIconPicker API"
    :json="json"
    no-menu
  />
</template>

<script>
import { defineComponent } from 'vue'
import Api from '@quasar/quasar-ui-qiconpicker/dist/api/QIconPicker.json'

export default defineComponent({
  name: 'QIconPickerJsonApi',
  setup () {
    return {
      json: Api
    }
  }
})
</script>
