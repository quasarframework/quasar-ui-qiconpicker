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

      <q-input v-model="value" label="Icon" clearable>
        <template v-slot:append>
          <q-icon name="extension" class="cursor-pointer">
            <q-popup-proxy v-model="showIconPicker">

              <q-icon-picker
                v-model="value"
                :filter="value"
                icon-set="material-icons"
                tooltips
                :pagination.sync="pagination"
                style="height: 300px; width: 300px;"
              />

            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

    </div>
  </div>
</template>

<script>
import template from '../../markdown/examples/template/using-qinput.md'
import script from '../../markdown/examples/script/using-qinput.md'

export default {
  data () {
    return {
      tab: 'template',
      template: template,
      script: script,
      value: '',
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      }
    }
  },
  watch: {
    value () {
      this.showIconPicker = false
    }
  }
}
</script>
