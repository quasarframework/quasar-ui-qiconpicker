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
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      font-size="30px"
      :pagination.sync="pagination"
      style="height: 360px;"
    />

  </div>
</template>

<script>
import template from '../../markdown/examples/template/size.md'
import script from '../../markdown/examples/script/size.md'

export default {
  data () {
    return {
      tab: 'template',
      template: template,
      script: script,
      value: '',
      pagination: {
        itemsPerPage: 32,
        page: 0
      }
    }
  }
}
</script>
