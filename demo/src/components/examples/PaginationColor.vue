<template>
  <div>
    <q-expansion-item
      group="someGroup"
      caption="Code"
    >
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="template" label="Template" />
          <q-tab name="script" label="Script" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="template">
            <q-markdown :src="template" />
          </q-tab-panel>

          <q-tab-panel name="script">
            <q-markdown :src="script" />
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </q-expansion-item>
    <q-separator />
    <div class="row justify-center q-ma-md">
      <p class="text-caption">Enter colors only from the Quasar color palette (ex: "orange-8")</p>
    </div>
    <div class="row justify-center q-gutter-sm q-mb-md">
      <q-input filled v-model="paginationColor" label="Pagination Color" />
    </div>
    <q-separator />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :pagination.sync="pagination"
      :paginationColor="paginationColor"
      style="height: 220px;"
    />

  </div>
</template>

<script>
import template from '../../markdown/examples/template/pagination-color.md'
import script from '../../markdown/examples/script/pagination-color.md'

export default {
  data () {
    return {
      tab: 'template',
      template: template,
      script: script,
      value: '',
      pagination: {
        itemsPerPage: 60,
        page: 0
      },
      paginationColor: 'orange-10'
    }
  }
}
</script>
