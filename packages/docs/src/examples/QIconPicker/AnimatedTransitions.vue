<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 620px">
      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        :icons="icons"
        animated
        transition-prev="jump-right"
        transition-next="jump-left"
        selected-color="deep-orange-7"
        selected-text-color="white"
        :pagination-props="{
          maxPages: 4,
          directionLinks: true,
          color: 'deep-orange-7',
        }"
        style="height: 220px"
      />

      <div class="q-mt-md text-center">
        Selected animated icon: <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'AnimatedTransitions' })

const value = ref('')
const pagination = ref({
  itemsPerPage: 8,
  page: 1,
})

const icons = [
  { name: 'rocket_launch' },
  { name: 'bolt' },
  { name: 'auto_awesome' },
  { name: 'flare' },
  { name: 'flash_on' },
  { name: 'tips_and_updates' },
  { name: 'lightbulb' },
  { name: 'stars' },
  { name: 'public' },
  { name: 'explore' },
  { name: 'travel_explore' },
  { name: 'map' },
  { name: 'navigation' },
  { name: 'near_me' },
  { name: 'flag' },
  { name: 'assistant_navigation' },
  { name: 'settings' },
  { name: 'tune' },
  { name: 'dashboard' },
  { name: 'widgets' },
  { name: 'extension' },
  { name: 'build' },
  { name: 'construction' },
  { name: 'handyman' },
]
</script>
