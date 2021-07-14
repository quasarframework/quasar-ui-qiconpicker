<template>
  <q-page class="flex flex-center">
    <default></default>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Default from "components/Default";

export default defineComponent({
  name: 'PageIndex',
  components: {
    Default
  }
})
</script>
