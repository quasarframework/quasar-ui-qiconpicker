<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 520px">
      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        :icons="icons"
        no-footer
        selected-color="cyan-7"
        style="height: 150px"
      />

      <div class="q-mt-md text-center">
        Selected compact action: <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'
import {
  matAdd,
  matDelete,
  matEdit,
  matFavorite,
  matSearch,
  matSettings,
} from '@quasar/extras/material-icons'

defineOptions({ name: 'NoFooter' })

const value = ref('')
const pagination = ref({
  itemsPerPage: 0,
  page: 1,
})

const icons = [
  { name: 'add', icon: matAdd },
  { name: 'delete', icon: matDelete },
  { name: 'edit', icon: matEdit },
  { name: 'favorite', icon: matFavorite },
  { name: 'search', icon: matSearch },
  { name: 'settings', icon: matSettings },
]
</script>
