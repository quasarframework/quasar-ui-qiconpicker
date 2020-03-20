<template>
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
        :tooltips="tooltips"
        :color="color"
        :background-color="backgroundColor"
        :selected-color="selectedColor"
        :selected-background-color="selectedBackgroundColor"
        :font-size="fontSize"
        :pagination.sync="pagination"
        style="height: 300px;"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'IconCard',

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
        { label: 'MDI Icons (v5)', value: 'mdi-v5' },
        { label: 'Themify Icons', value: 'themify' },
        { label: 'Line-awesome Icons', value: 'line-awesome' }
      ],
      selectedIconSet: {}
    }
  },

  props: {
    tooltips: Boolean,
    color: String,
    backgroundColor: String,
    selectedColor: String,
    selectedBackgroundColor: String,
    fontSize: {
      type: String,
      default: 'inherit'
    },
    pagination: Object
  },

  mounted () {
    this.setIconSet('material-icons')
  },

  computed: {
    title () {
      if (this.selectedIconSet && 'label' in this.selectedIconSet) {
        return this.selectedIconSet.label
      }
      return ''
    }
  },

  watch: {
    name (val) {
      this.setIconSet(val)
    }
  },

  methods: {
    setIconSet (val) {
      this.value = ''
      this.name = val
      this.selectedIconSet = {}
      if (val) {
        for (let i = 0; i < this.iconSets.length; ++i) {
          if (val === this.iconSets[i].value) {
            this.selectedIconSet = this.iconSets[i]
            break
          }
        }
      }
    },
    onMove (data) {

    },
    prev () {

    },
    next () {

    }
  }
}
</script>

<style>
</style>
