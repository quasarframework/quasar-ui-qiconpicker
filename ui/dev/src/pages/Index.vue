<template>
  <q-page class="flex flex-center">
    <color></color>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Color from "components/Color";

export default defineComponent({
  name: 'PageIndex',
  components: {
    Color
  }
})
</script>
