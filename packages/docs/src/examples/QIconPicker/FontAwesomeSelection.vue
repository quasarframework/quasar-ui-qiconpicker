<template>
  <div class="row justify-center q-ma-md">
    <div style="width: min(700px, 100%)">
      <q-banner rounded class="q-mb-md bg-grey-2 text-grey-9">
        Use <code>icon-set="fontawesome-v7"</code> to lazy load the Quasar Extras Font Awesome set.
        The filter narrows the large icon family, and the picker emits the selected Quasar icon
        name.
      </q-banner>

      <q-input
        v-model="filter"
        label="Filter Font Awesome v7"
        outlined
        dense
        clearable
        class="q-mb-md"
      />

      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        icon-set="fontawesome-v7"
        :filter="filter"
        tooltips
        style="height: 260px"
      />

      <q-banner rounded class="q-mt-md bg-grey-2 text-grey-9">
        Emitted value:
        <code>{{ value || 'none' }}</code>
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'FontAwesomeSelection' })

const value = ref('')
const filter = ref('')
const pagination = ref({
  itemsPerPage: 72,
  page: 1,
})
</script>
