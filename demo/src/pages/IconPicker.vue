<template>
  <q-page>
    <div class="row q-pa-md q-gutter-sm">

      <q-card style="width: 100%; max-width: 600px;">
        <q-card-section>
          <div class="text-h6">QIconPicker Example</div>
          <div class="text-subtitle2">{{ title }}</div>
          <div>
            <q-select v-model="name" :options="iconSets" label="Icon Set" emit-value />
            <q-input v-model="filter" label="Filter" clearable />
            <div class="q-mt-md"><strong>Selected:</strong> <q-icon :name="value" style="font-size: 28px;"/> {{ value }}</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-icon-picker
            v-model="value"
            :icon-set="name"
            :filter="filter"
            :pagination.sync="pagination"
            :tooltips="tooltips"
            :dense="dense"
            :no-footer="noFooter"
            pagination-color="black"
            style="height: 300px;"
          />
        </q-card-section>
      </q-card>

      <q-card style="width: 100%; max-width: 350px;">
        <q-card-section>
          <div class="text-h6">QIconPicker Example using QInput</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input v-model="value" label="Icon" clearable >
            <template v-slot:append>
              <q-icon name="extension" class="cursor-pointer">
                <q-popup-proxy v-model="showIconPicker">

                  <q-icon-picker
                    v-model="value"
                    :filter="value"
                    icon-set="material-icons"
                    :tooltips="tooltips"
                    :dense="dense"
                    :no-footer="noFooter"
                    style="height: 300px; width: 300px;"
                  />

                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <p>You can use the QInput as a bit of a filter, by typing part of an icon, then clicking on the icon button. The results will then be filtered to show only matching icons. Clear the text before selecting a new icon to see all of them.</p>
          <p>Note: This example is using Material Icons.</p>
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IconPicker',

  data () {
    return {
      value: '',
      name: 'material-icons',
      filter: '',
      iconSets: [
        { label: 'Eva Icons', value: 'eva-icons' },
        { label: 'Fontawesome Icons', value: 'fontawesome-v5' },
        { label: 'Ion Icons', value: 'ionicons-v4' },
        { label: 'Material Icons', value: 'material-icons' },
        { label: 'Material Icons Outlined', value: 'material-icons-outlined' },
        { label: 'Material Icons Round', value: 'material-icons-round' },
        { label: 'Material Icons Sharp', value: 'material-icons-sharp' },
        { label: 'MDI Icons', value: 'mdi-v3' },
        { label: 'Themify Icons', value: 'themify' }
      ],
      showIconPicker: false,
      pagination: {
        itemsPerPage: 60,
        page: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      tooltips: 'iconpicker/tooltips',
      dense: 'iconpicker/dense',
      noFooter: 'iconpicker/noFooter'
    }),

    title () {
      if (this.selectedIconSet && 'label' in this.selectedIconSet) {
        return this.selectedIconSet.label
      }
      return ''
    }
  },

  watch: {
    dense (va) {
      this.pagination.itemsPerPage = (this.dense ? 136 : 60)
    }
  }
}
</script>
