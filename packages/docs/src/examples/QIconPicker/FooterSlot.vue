<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px">
      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        icon-set="material-icons"
        selected-color="teal-7"
        style="height: 260px"
      >
        <template #footer="{ page, totalPages }">
          <div class="footer-slot row items-center justify-between q-pa-sm full-width q-gutter-sm">
            <div class="row items-center q-gutter-sm">
              <q-icon :name="value || 'help_outline'" size="sm" />
              <code>{{ value || 'Choose an icon' }}</code>
            </div>

            <q-pagination
              :model-value="page"
              :max="totalPages"
              dense
              input
              color="teal-7"
              @update:model-value="pagination.page = $event"
            />

            <q-btn
              flat
              dense
              color="negative"
              label="Clear"
              :disable="!value"
              @click="value = ''"
            />
          </div>
        </template>
      </q-icon-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'

defineOptions({ name: 'FooterSlot' })

const value = ref('')
const pagination = ref({
  itemsPerPage: 72,
  page: 1,
})
</script>

<style lang="scss" scoped>
.footer-slot {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

:global(body.body--dark) .footer-slot {
  border-top-color: rgba(255, 255, 255, 0.18);
}
</style>
