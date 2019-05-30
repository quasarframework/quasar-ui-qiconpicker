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

    <div class="q-ma-md">
      <strong>Selected:</strong> {{ value }}
    </div>
    <q-icon-picker
      v-model="value"
      :icons="icons"
      style="height: 100px;"
    />

  </div>
</template>

<script>
import template from '../../markdown/examples/template/custom-icon-set.md'
import script from '../../markdown/examples/script/custom-icon-set.md'

export default {
  data () {
    return {
      tab: 'template',
      template: template,
      script: script,
      value: '',
      icons: [
        { name: 'camera' },
        { name: 'ion-ios-camera' },
        { name: 'fas fa-camera' },
        { name: 'eva-camera' },
        { name: 'mdi-camera' },
        { name: 'ti-camera' }
      ],
      pagination: {
        itemsPerPage: 60,
        page: 0
      }
    }
  }
}
</script>
