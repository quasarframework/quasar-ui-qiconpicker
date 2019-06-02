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
      <q-select v-model="pagination.itemsPerPage" :options="options" label="Items Per Page" class="q-ma-sm col-4" />
    </div>
    <q-separator />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :pagination.sync="pagination"
      style="height: 220px;"
    />

  </div>
</template>

<script>
import template from '../../markdown/examples/template/pagination.md'
import script from '../../markdown/examples/script/pagination.md'

export default {
  data () {
    return {
      tab: 'template',
      template: template,
      script: script,
      value: '',
      pagination: {
        itemsPerPage: 75,
        page: 0
      },
      options: [ 25, 50, 75, 100 ]
    }
  }
}
</script>
